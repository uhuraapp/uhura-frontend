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

#include <QtCore>
#include <QApplication>
#include <QtQuick>

static void customMessageOutput(QtMsgType type, const QMessageLogContext &, const QString &msg) {
    switch (type) {
    case QtDebugMsg:
        if (qgetenv("DEBUG").size()) {
            fprintf(stderr, "Debug: %s\n", msg.toStdString().c_str());
        }
        break;
    case QtWarningMsg:
        fprintf(stderr, "Warning: %s\n", msg.toStdString().c_str());
        break;
    case QtCriticalMsg:
        fprintf(stderr, "Critical: %s\n", msg.toStdString().c_str());
        break;
    case QtFatalMsg:
        fprintf(stderr, "Fatal: %s\n", msg.toStdString().c_str());
        abort();
    }
}

int main(int argc, char *argv[]) {
    printf("\nApache Cordova native platform version %s is starting\n\n", CORDOVA_UBUNTU_VERSION);
    fflush(stdout);

    qInstallMessageHandler(customMessageOutput);
    QApplication app(argc, argv);

    //TODO: switch to options parser
    // temprory hack to filter --desktop_file_hint
    QStringList args = app.arguments().filter(QRegularExpression("^[^-]"));

    QDir wwwDir;
    if (QDir(args[args.size() - 1]).exists()) {
        wwwDir = QDir(args[args.size() - 1]);
    } else {
        wwwDir = QDir(QApplication::applicationDirPath());
        wwwDir.cd("www");
    }

    QQmlApplicationEngine view;

    QDir workingDir = QApplication::applicationDirPath();
    view.rootContext()->setContextProperty("www", wwwDir.absolutePath());

    view.load(QUrl(QString("%1/qml/main.qml").arg(workingDir.absolutePath())));

    return app.exec();
}
