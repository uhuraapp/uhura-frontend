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

#include <iostream>
#include <gtest/gtest.h>
#include <QtCore>
#include <QApplication>
#include <QtQuick>

#include "../src/cplugin.h"
#include "../src/cordova_config.hpp"

TEST(CordovaInternal, format_double_int_int) {
    auto t = std::make_tuple(1.1, 2, 3);
    auto doc = QJsonDocument().fromJson(QString("[ %1 ]").arg(CordovaInternal::tuple2str(t)).toUtf8());
    EXPECT_EQ(doc.isArray(), true);
    EXPECT_EQ(doc.array().size(), 3);
    EXPECT_EQ(doc.array().at(1).toInt(), 2);
    EXPECT_EQ(doc.array().at(2).toInt(), 3);
    EXPECT_EQ(doc.array().at(0).toDouble(), 1.1);
}

TEST(CordovaInternal, format_obj_bool) {
    QVariantMap obj;
    obj.insert("a", 1);
    obj.insert("b", 2);
    obj.insert("c", "string");

    auto t = std::make_tuple(obj, true);
    auto doc = QJsonDocument().fromJson(QString("[ %1 ]").arg(CordovaInternal::tuple2str(t)).toUtf8());

    EXPECT_EQ(doc.isArray(), true);
    EXPECT_EQ(doc.array().size(), 2);
    EXPECT_EQ(doc.array().at(1).toBool(), true);

    auto o = doc.array().at(0).toObject();

    EXPECT_EQ(o.size(), 3);
    EXPECT_EQ(o.value("a").toInt(), 1);
    EXPECT_EQ(o.value("b").toInt(), 2);
    EXPECT_EQ(o.value("c").toString(), "string");
}

TEST(CordovaInternal, config) {
    CordovaInternal::Config config("../xml/config.xml");

    EXPECT_EQ(config.content(), "index.html");
    EXPECT_EQ(config.appId(), "io.cordova.helloCordova");
    EXPECT_EQ(config.appVersion(), "2.0.0");
    EXPECT_EQ(config.fullscreen(), false);
}

TEST(Cordova, WhiteList) {
    int argc = 0;
    QApplication app(argc, NULL);
    QQmlApplicationEngine view;
    view.addImportPath(QDir("./cordova_ubuntu/").absolutePath());

    QDir wwwDir("../tests/data/www");
    QDir workingDir = QApplication::applicationDirPath();
    view.rootContext()->setContextProperty("www", wwwDir.absolutePath());

    view.load(QUrl(QString("%1/cordova_ubuntu/qml/main.qml").arg(workingDir.absolutePath())));

    QTimer timer;
    timer.connect(&timer, &QTimer::timeout, [&]() {
        QApplication::quit();
    });
    timer.start(1000);

    EXPECT_EQ(app.exec(), 0);
}

int main(int argc, char** argv) {
    ::testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
