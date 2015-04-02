/*
 *
 * Copyright 2013 Canonical Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
#ifndef QMLPLUGIN_H_SDASDAS
#define QMLPLUGIN_H_SDASDAS

#include <QtCore>
#include <QtQuick>
#include <cassert>

#include "cordova.h"

class CordovaWrapper: public QQuickItem {
    Q_OBJECT
    Q_PROPERTY(QString wwwDir READ wwwDir WRITE setWwwDir SCRIPTABLE true FINAL)
    Q_PROPERTY(QString mainUrl READ mainUrl CONSTANT)
public:
    CordovaWrapper() = default;

    QString wwwDir() {
        if (!_cordova.data()) {
            return "";
        }
        return _wwwDir;
    }

    void setWwwDir(const QString &www) {
        _wwwDir = www;

        initialize();
    }

    Q_INVOKABLE QString getSplashscreenPath() {
        assert(_cordova.data());
        return _cordova->getSplashscreenPath();
    }

    Q_INVOKABLE static QString getDataLocation() {
        return QStandardPaths::writableLocation(QStandardPaths::DataLocation);
    }

    QString mainUrl() {
        if (!_cordova.data()) {
            return "";
        }
        return _cordova->mainUrl();
    }

    Q_INVOKABLE bool isUrlWhiteListed(const QString &uri) {
        if (!_cordova.data()) {
            return true;
        }
        return _cordova->config().whitelist().isUrlWhiteListed(uri);
    }

    Q_INVOKABLE CordovaInternal::Config* config() const {
        assert(_cordova.data());

        //FIXME:
        CordovaInternal::Config *config = const_cast<CordovaInternal::Config*>(&_cordova->config());
        QQmlEngine::setObjectOwnership(config, QQmlEngine::CppOwnership);
        return config;
    }

signals:
    void javaScriptExecNeeded(const QString &js);
    void pluginWantsToBeAdded(const QString &pluginName, QObject *pluginObject, const QString &pluginShortName);
    void qmlExecNeeded(const QString &src);
public slots:
    void setTitle(const QString &title) {
        if (!_cordova.data() || !_cordova->rootObject()) {
            return;
        }
        return _cordova->setTitle(title);
    }

    void loadFinished(bool b) {
        if (!_cordova.data()) {
            return;
        }
        return _cordova->loadFinished(b);
    }
    void appLoaded() {
        assert(_cordova.data());
        return _cordova->appLoaded();
    }

private:
    void initialize() {
        assert(!_cordova.data());

        if (!_wwwDir.size())
            return;

        _cordova = QSharedPointer<Cordova>(new Cordova(QDir(_wwwDir), this));

        connect(_cordova.data(), &Cordova::javaScriptExecNeeded, [&] (const QString &js) {
            emit javaScriptExecNeeded(js);
        });
        connect(_cordova.data(), &Cordova::qmlExecNeeded, [&] (const QString &src) {
            emit qmlExecNeeded(src);
        });
        connect(_cordova.data(), &Cordova::pluginWantsToBeAdded, [&] (const QString &pluginName, QObject *pluginObject, const QString &pluginShortName) {
            emit pluginWantsToBeAdded(pluginName, pluginObject, pluginShortName);
        });
    }

    QSharedPointer<Cordova> _cordova;
    QString _wwwDir;
};

class CordovaUbuntuPlugin: public QQmlExtensionPlugin {
    Q_OBJECT
    Q_PLUGIN_METADATA(IID "org.qt-project.Qt.QQmlExtensionInterface")

public:
    void registerTypes(const char *uri);
};

#endif
