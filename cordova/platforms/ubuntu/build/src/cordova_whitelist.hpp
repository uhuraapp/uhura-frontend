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

#ifndef CORDOVA_WHITELIST_HKJBNNBNM53452
#define CORDOVA_WHITELIST_HKJBNNBNM53452

#include <QtCore>

// ported from https://github.com/apache/cordova-android/blob/master/framework/src/org/apache/cordova/Whitelist.java
namespace CordovaInternal {
    class WhiteList {
    public:
        WhiteList();

        bool isUrlWhiteListed(const QString &uri) const;
        void addWhiteListEntry(const QString &origin, bool subdomains);
    private:
        class URLPattern {
        public:
            URLPattern(const QString &scheme, const QString &host,
                       const QString &port, const QString &path);
            bool matches(QUrl uri) const;

        private:
            QString regexFromPattern(const QString &pattern, bool allowWildcards) const;
            QRegExp _scheme, _host, _path;
            int _port;
        };

        QList<URLPattern> _whiteList;
        bool _unlimited, _empty;
        Q_DISABLE_COPY(WhiteList);
    };
}

#endif
