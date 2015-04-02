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

#ifndef CORDOVA_CONFIG_NMNMREQW525252
#define CORDOVA_CONFIG_NMNMREQW525252

#include <QtCore>
#include "cordova_whitelist.hpp"

namespace CordovaInternal {
    class Config: public QObject {
        Q_OBJECT
    public:
        explicit Config(const QString &xmlConfig);

        const WhiteList& whitelist() const;
        const QString& content() const;

        Q_INVOKABLE QString appId() const;
        Q_INVOKABLE QString appVersion() const;

        bool disallowOverscroll() const;
        Q_INVOKABLE bool fullscreen() const;
    private:
        WhiteList _whitelist;
        QString _content;
        QString _appId, _appVersion;
        bool _fullscreen, _disallowOverscroll;

        Q_DISABLE_COPY(Config);
    };
}

#endif
