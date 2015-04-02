/*
 *  Copyright 2014 Canonical Ltd.
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

#include "cordova_config.hpp"
#include <QtXml>

using namespace CordovaInternal;

Config::Config(const QString &xmlConfig) {
    QDomDocument config;

    QFile f1(xmlConfig);
    f1.open(QIODevice::ReadOnly);

    config.setContent(f1.readAll(), false);

    QDomNodeList nodes = config.documentElement().elementsByTagName("access");
    for (int i = 0; i < nodes.size(); ++i) {
        QDomNode node = nodes.at(i);
        QDomElement* element = static_cast<QDomElement*>(&node);

        QString origin = element->attribute("origin");

        _whitelist.addWhiteListEntry(origin, false);
    }

    _fullscreen = false;
    _disallowOverscroll = false;
    nodes = config.documentElement().elementsByTagName("preference");
    for (int i = 0; i < nodes.size(); ++i) {
        QDomNode node = nodes.at(i);
        QDomElement* element = static_cast<QDomElement*>(&node);

        QString name = element->attribute("name"), value = element->attribute("value");

        if (name == "Fullscreen")
            _fullscreen = value == "true";
        if (name == "DisallowOverscroll")
            _disallowOverscroll = value == "true";
    }

    _content = "index.html";
    nodes = config.documentElement().elementsByTagName("content");
    for (int i = 0; i < nodes.size(); ++i) {
        QDomNode node = nodes.at(i);
        QDomElement* element = static_cast<QDomElement*>(&node);

        _content = element->attribute("src");
        break;
    }

    _appId = config.documentElement().attribute("id");
    _appVersion = config.documentElement().attribute("version");
}

const WhiteList& Config::whitelist() const {
    return _whitelist;
}

const QString& Config::content() const {
    return _content;
}

QString Config::appId() const {
    return _appId;
}

QString Config::appVersion() const {
    return _appVersion;
}

bool Config::disallowOverscroll() const {
    return _disallowOverscroll;
}

bool Config::fullscreen() const {
    return _fullscreen;
}
