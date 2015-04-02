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
#include "cordova_whitelist.hpp"

using namespace CordovaInternal;

WhiteList::WhiteList(): _unlimited(false), _empty(true) {
}

bool WhiteList::isUrlWhiteListed(const QString &uri) const {
    // allow everything by default
    if (_empty)
        return true;

    if (_unlimited)
        return true;

    QUrl parsedUri(uri);

    for (const URLPattern &p: _whiteList) {
        if (p.matches(parsedUri))
            return true;
    }
    return false;
}

void WhiteList::addWhiteListEntry(const QString &origin, bool) {
    _empty = false;

    if (_unlimited)
        return;
    if (origin == "*") {
        _unlimited = true;
        return;
    }

    QRegExp parts("^((\\*|[A-Za-z-]+):(//)?)?(\\*|((\\*\\.)?[^*/:]+))?(:(\\d+))?(/.*)?");
    if (parts.indexIn(origin) == -1)
        return;

    QString scheme = parts.cap(2);
    QString host = parts.cap(4);

    // Special case for two urls which are allowed to have empty hosts
    if (("file" == scheme || "content" == scheme) && !host.size()) host = "*";
    QString port = parts.cap(8);
    QString path = parts.cap(9);

    if (!scheme.size()) {
        _whiteList.append(URLPattern("http", host, port, path));
        _whiteList.append(URLPattern("https", host, port, path));
    } else {
        _whiteList.append(URLPattern(scheme, host, port, path));
    }
}

WhiteList::URLPattern::URLPattern(const QString &scheme, const QString &host,
                                  const QString &port, const QString &path) {

    if (scheme.size() && "*" != scheme)
        _scheme = QRegExp(regexFromPattern(scheme, false), Qt::CaseInsensitive);

    if ("*" != host) {
        if (host.startsWith("*.")) {
            _host = QRegExp("([a-z0-9.-]*\\.)?" + regexFromPattern(host.mid(2), false), Qt::CaseInsensitive);
        } else {
            _host = QRegExp(regexFromPattern(host, false), Qt::CaseInsensitive);
        }
    }

    if (!port.size() || "*" == port) {
        _port = 0;
    } else {
        _port = port.toInt(nullptr, 10);
    }

    if (path.size() && "/*" != path) {
        _path = QRegExp(regexFromPattern(path, true));
    }
}

bool WhiteList::URLPattern::matches(QUrl uri) const {
    return ((_scheme.isEmpty() || _scheme.exactMatch(uri.scheme())) &&
            (_host.isEmpty() || _host.exactMatch(uri.host())) &&
            (_port == 0 || _port == uri.port()) &&
            (_path.isEmpty() || _path.exactMatch(uri.path())));
}

QString WhiteList::URLPattern::regexFromPattern(const QString &pattern, bool allowWildcards) const {
    QString toReplace("\\.[]{}()^$?+|");

    QString regex;
    for (int i=0; i < pattern.size(); i++) {
        QChar c = pattern[i];
        if (c == '*' && allowWildcards) {
            regex.append(".");
        } else if (toReplace.indexOf(c) > -1) {
            regex.append('\\');
        }
        regex.append(c);
    }
    return regex;
}
