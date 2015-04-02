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

#ifndef CPLUGIN_H
#define CPLUGIN_H

#include <QtCore>

namespace CordovaInternal {
    template<size_t J>
    struct Assign {
        template<typename Result, typename Src>
        static void x(Result& t, const Src& tup) {
            std::get<J - 1>(t) = std::get<J>(tup);
            Assign<J - 1>::x(t, tup);
        }
    };

    template<>
    struct Assign<1> {
        template<typename Result, typename Src>
        static void x(Result& t, const Src& tup) {
            std::get<0>(t) = std::get<1>(tup);
        }
    };

    template<typename Head, typename... Tail>
    std::tuple<Tail...> tail(std::tuple<Head, Tail...> &tuple) {
        std::tuple<Tail...> t;
        Assign<std::tuple_size<std::tuple<Tail...>>::value>::x(t, tuple);
        return t;
    }
    template<typename Head>
    std::tuple<> tail(std::tuple<Head> &) {
	return std::tuple<>();
    }
    template<typename Head = QString>
	std::tuple<> tail(std::tuple<> &) {
	return std::tuple<>();
    }

    template<typename T>
        QString format(const T &t) {
        return QString("%1").arg(t);
    }
    QString format(const QString &t);
    QString format(const QByteArray &t);
    QString format(const char* const t);
    QString format(const double &t);
    QString format(const float &t);
    QString format(const QVariant &t);
    QString format(const QVariantMap &t);
    QString format(bool t);

    template<class Head = QString>
    QString tuple2str(std::tuple<> &) {
      return QString();
    }
    template<class... Args>
    QString tuple2str(std::tuple<Args...> &tuple) {
      auto t = tail(tuple);
      QString rest = tuple2str(t);
      QString head(format(std::get<0>(tuple)));
      if (rest.size() == 0)
	return head;
      return QString("%1, %2").arg(head).arg(rest);
    }
    template<typename Head>
    QString tuple2str(std::tuple<Head> &tuple) {
      return format(std::get<0>(tuple));
    }
};

class Cordova;

class CPlugin: public QObject {
    Q_OBJECT
public:
    explicit CPlugin(Cordova *cordova);

    void callbackWithoutRemove(int p_callbackId, const QString &p_jsParameters);
    void callback(int p_callbackId, const QString &p_jsParameters);

    template<typename... Arguments>
    void cb(int callbackId, Arguments... args) {
      auto tuple = std::make_tuple(args...);
      callback(callbackId, CordovaInternal::tuple2str(tuple));
    }
    template<typename... Arguments>
    void cb(int callbackId) {
      callback(callbackId, "");
    }

    virtual const QString fullName() = 0;
    virtual const QString shortName() = 0;
    virtual void onAppLoaded() {
    }
protected:
    Cordova *m_cordova;
private:
    CPlugin(const CPlugin&) = delete;
    CPlugin& operator=(const CPlugin&) = delete;
};

typedef QList<QSharedPointer<CPlugin>> (*CordovaGetPluginInstances)(Cordova *cordova);

#endif
