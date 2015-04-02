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
#include <QtCore>
#include "cplugin.h"
#include "coreplugins.h"
#include "plugins/org.apache.cordova.device/device.h"
#include "plugins/org.apache.cordova.file/file.h"
#include "plugins/org.apache.cordova.file-transfer/file-transfer.h"
#include "plugins/org.apache.cordova.inappbrowser/inappbrowser.h"
#include "plugins/org.apache.cordova.network-information/network_information.h"
INSERT_HEADER_HERE

#define INIT_PLUGIN(class) \
    res.prepend(QSharedPointer<class>(new class(cordova))); \

extern "C" {

Q_DECL_EXPORT QList<QSharedPointer<CPlugin>> cordovaGetPluginInstances(Cordova *cordova) {
    QList<QSharedPointer<CPlugin>> res;

    INIT_PLUGIN(Device);INIT_PLUGIN(File);INIT_PLUGIN(FileTransfer);INIT_PLUGIN(Inappbrowser);INIT_PLUGIN(NetworkInformation);INSERT_PLUGIN_HERE

    return res;
}

}
