/*
 *  Copyright 2013 Canonical Ltd.
 *  Copyright 2011 Wolfgang Koller - http://www.gofg.at/
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

#include "cordova.h"

#include <QtGui>

#include <QApplication>
#include <QQuickView>
#include <QQuickItem>
#include <QQmlContext>

Cordova::Cordova(const QDir &wwwDir, QQuickItem *item, QObject *parent)
    : QObject(parent), _item(item), _www(wwwDir), _config(_www.absoluteFilePath("../config.xml")) {

    qDebug() << "Using" << _www.absolutePath() << "as working dir";

    if (!_www.exists(_config.content()))
        qCritical() << _config.content() << "does not exists";

    _mainUrl = QUrl::fromUserInput(_www.absoluteFilePath(_config.content())).toString();

    qDebug() << _mainUrl;
}

void Cordova::appLoaded() {
    initPlugins();
    for (QSharedPointer<CPlugin> &plugin: _plugins) {
        plugin->onAppLoaded();
    }
}

QString Cordova::get_app_dir() {
    return _www.absolutePath();
}

struct Splash {
    double rating;
    QString path;
};

QString Cordova::getSplashscreenPath() {
    double ratio = (double)_item->width() / _item->height();

    QDir dir(get_app_dir());
    if (!dir.cd("splashscreen"))
        return "";

    QList<Splash> images;
    for (QFileInfo info: dir.entryInfoList()) {
        QImage image(info.absoluteFilePath());
        if (image.isNull())
            continue;
        Splash t;
        t.path = info.absoluteFilePath();
        t.rating = std::abs((image.width() / (double)_item->width()) * ((image.width() / image.height()) / ratio) - 1);
        images.push_back(t);
    }
    std::min_element(images.begin(), images.end(), [](Splash &f, Splash &s) {
        return f.rating < s.rating;
    });
    if (!images.empty())
      return images.first().path;
    return "";
}

const CordovaInternal::Config& Cordova::config() const {
    return _config;
}

void Cordova::initPlugins() {
    QList<QDir> searchPath = {get_app_dir()};

    _plugins.clear();
    for (QDir pluginsDir: searchPath) {
        for (const QString &fileName: pluginsDir.entryList(QDir::Files)) {
            QString path = pluginsDir.absoluteFilePath(fileName);
            qDebug() << "Testing" << path;

            if (!QLibrary::isLibrary(path))
                continue;

            CordovaGetPluginInstances loader = (CordovaGetPluginInstances) QLibrary::resolve(path, "cordovaGetPluginInstances");
            if (!loader) {
                qCritical() << "Missing cordovaGetPluginInstances symbol in" << path;
                continue;
            }

            auto plugins = (*loader)(this);

            for (QSharedPointer<CPlugin> plugin: plugins) {
                qDebug() << "Enable plugin" << plugin->fullName();
                emit pluginWantsToBeAdded(plugin->fullName(), plugin.data(), plugin->shortName());
            }
            _plugins += plugins;
        }
    }
}

void Cordova::loadFinished(bool ok) {
    Q_UNUSED(ok)

    initPlugins();
}

void Cordova::execQML(const QString &src) {
    emit qmlExecNeeded(src);
}

void Cordova::execJS(const QString &js) {
    emit javaScriptExecNeeded(js);
}

QString Cordova::mainUrl() const {
    return _mainUrl;
}

QObject *Cordova::topLevelEventsReceiver() {
    return dynamic_cast<QQuickWindow*>(_item->window());
}

QQuickItem *Cordova::rootObject() {
    return _item->parentItem();
}

void Cordova::setTitle(const QString &title) {
    dynamic_cast<QQuickWindow*>(_item->window())->setTitle(title);
}

void Cordova::pushViewState(const QString &state) {
    if (_states.empty()) {
        rootObject()->setState(state);
    }
    _states.push_front(state);
}

void Cordova::popViewState(const QString &state) {
    if (!_states.removeOne(state))
        qDebug() << "WARNING: incorrect view states order";

    if (_states.empty()) {
        rootObject()->setState("main");
    } else {
        rootObject()->setState(_states.front());
    }
}
