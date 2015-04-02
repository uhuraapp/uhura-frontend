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

#include "cplugin.h"
#include "cordova.h"

CPlugin::CPlugin(Cordova *cordova): QObject(0), m_cordova(cordova) {
}

void CPlugin::callback(int p_callbackId, const QString &p_jsParameters) {
    QString javascript;
    if (p_jsParameters.length() > 0) {
        javascript = QString("cordova.callback(%1, %2);").arg(p_callbackId).arg(p_jsParameters);
    }
    else {
        javascript = QString("cordova.callback(%1);").arg(p_callbackId);
    }

    if (javascript.size() > 1000) {
        QString t = javascript;
        t.resize(1000);
        qDebug() << "Running: " << t;
    } else {
        qDebug() << "Running: " << javascript;
    }
    m_cordova->execJS(javascript);
}

void CPlugin::callbackWithoutRemove(int p_callbackId, const QString &p_jsParameters) {
    QString javascript;

    if (p_jsParameters.length() > 0) {
        javascript = QString("cordova.callbackWithoutRemove(%1, %2);").arg(p_callbackId).arg(p_jsParameters);
    }
    else {
        javascript = QString("cordova.callbackWithoutRemove(%1);").arg(p_callbackId);
    }

    if (javascript.size() > 1000) {
        QString t = javascript;
        t.resize(1000);
        qDebug() << "Running: " << t;
    } else {
        qDebug() << "Running: " << javascript;
    }
    m_cordova->execJS(javascript);
}

static QString escapeCharacters(QString str) {
    QString res;
    str = str.replace('\\', QString("\\\\")).replace('"', "\\\"").replace('\'', "\\\'").replace('\n', "\\n");
    res.reserve(str.size() * 2);
    for (QString::const_iterator it = str.begin(); it != str.end(); ++it) {
        QChar ch = *it;
        ushort code = ch.unicode();
        if (code < 0x80 && code >= 0x20) {
            res += ch;
        } else {
            res += "\\u";
            res += QString::number(code, 16).rightJustified(4, '0').toUpper();
        }
    }
    return res;
}

namespace CordovaInternal {
    QString format(const QString &t) {
        return QString("\"%1\"").arg(escapeCharacters(t));
    }

    QString format(bool t) {
        if (t)
            return QString("true");
        return "false";
    }

    QString format(const QByteArray &t) {
        return format(QString(t));
    }

    QString format(const char* const t) {
        return format(QString(t));
    }

    QString format(const double &t) {
        if (std::isnan(t))
            return "Number.NaN";
        return QString::number(t);
    }

    QString format(const float &t) {
        return format(static_cast<double>(t));
    }

    QString format(const QVariant &t) {
        switch (t.userType()) {
        case QVariant::LongLong:
        case QVariant::ULongLong:
        case QVariant::Int:
        case QVariant::UInt:
            return format(t.toLongLong());
            break;
        case QVariant::String:
            return format(t.toString());
            break;
        case QVariant::Double:
            return format(t.toDouble());
            break;
        case QMetaType::Float:
            return format(t.toFloat());
        case QMetaType::Bool:
            return format(t.toBool());
        case QMetaType::QVariantMap:
            return format(t.toMap());
        default:
            throw std::exception();
        }
    }

    QString format(const QVariantMap &t) {
      // QString(QJsonDocument(QJsonObject::fromVariantMap(t)).toJson()) is not good enough
      // e.g. QVariant(qlonglong, 1374944677139) ) -> 1.37494e+12

      auto map = t.toStdMap();
      QString res;
      for (const std::pair<QString, QVariant> &p: map) {
          if (res.size())
              res += ", ";
          res += QString("%1: %2").arg(format(p.first)).arg(format(p.second));
      }

      res = QString("{%1}").arg(res);

      return res;
    }
};
