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
import QtQuick 2.0
import com.canonical.Oxide 1.0
import "cordova_wrapper.js" as CordovaWrapper
import Ubuntu.Components 0.1
import Ubuntu.Components.Popups 0.1

Item {
    id: root

    anchors.fill: parent

    state: "main"
    signal completed

    property string splashscreenPath
    property bool disallowOverscroll
    property var mainWebview

    function exec(plugin, func, args) {
        CordovaWrapper.execMethod(plugin, func, args);
    }
    function plugin(plugin) {
        return CordovaWrapper.pluginObjects[plugin];
    }
    property string usContext: "oxide://main-world"

    Rectangle {
        id: webViewContainer
        anchors.fill: parent
        WebView {
            id: webView
            anchors.fill: parent
            objectName: "webView"

            onNavigationRequested: {
                if (cordova.isUrlWhiteListed(request.url))
                    request.action = NavigationRequest.ActionAccept;
                else
                    request.action = NavigationRequest.ActionReject;
            }

            preferences.remoteFontsEnabled: true
            preferences.javascriptCanAccessClipboard: true
            preferences.canDisplayInsecureContent: true
            preferences.canRunInsecureContent: true

            preferences.allowUniversalAccessFromFileUrls: true
            preferences.allowFileAccessFromFileUrls: true

            preferences.localStorageEnabled: true
            preferences.appCacheEnabled: true

//            boundsBehavior: disallowOverscroll ? Flickable.StopAtBounds : Flickable.DragAndOvershootBounds
            property string scheme: "file"

            property var currentDialog: null

            // FIXME: remove code from geolocation plugin
            onGeolocationPermissionRequested: {
                request.accept();
            }

            context: WebContext {
                id: webcontext

                devtoolsEnabled: true
                devtoolsPort: 9222

                userScripts: [
                    UserScript {
                        context: usContext
                        emulateGreasemonkey: true
                        url: "escape.js"
                    }
                ]
                sessionCookieMode: {
                    if (typeof webContextSessionCookieMode !== 'undefined') {
                        if (webContextSessionCookieMode === "persistent") {
                            return WebContext.SessionCookieModePersistent
                        } else if (webContextSessionCookieMode === "restored") {
                            return WebContext.SessionCookieModeRestored
                        }
                    }
                    return WebContext.SessionCookieModeEphemeral
                }
                dataPath: cordova.getDataLocation()
            }

            messageHandlers: [
                ScriptMessageHandler {
                    msgId: "from-cordova"
                    contexts: [usContext]
                    callback: function(msg, frame) {
                        CordovaWrapper.messageHandler(msg.args)
                        console.log(JSON.stringify(msg.args))
                    }
                }
            ]

            Component.onCompleted: {
                root.mainWebview = webView;
                cordova.appLoaded();
                webView.url = cordova.mainUrl;
            }

            onTitleChanged: {
                cordova.setTitle(webView.title)
            }

            onLoadingChanged: {
                if (!webView.loading) {
                    root.completed()
                    cordova.loadFinished(true)
                }
            }
            Connections {
                target: cordova
                onJavaScriptExecNeeded: {
                      webView.rootFrame.sendMessage(usContext, "EXECUTE", {code: js});
                }
                onQmlExecNeeded: {
                    eval(src);
                }
                onPluginWantsToBeAdded: {
                    CordovaWrapper.addPlugin(pluginName, pluginObject)
                }
            }
        }
    }

    Image {
        id: splashscreen
        anchors.fill: parent
        source: splashscreenPath
        visible: false
        smooth: true
        fillMode: Image.PreserveAspectFit
    }

    states: [
        State {
            name: "main"
            PropertyChanges {
                target: webViewContainer
                visible: true
            }
            PropertyChanges {
                target: splashscreen
                visible: false
            }
        },
        State {
            name: "splashscreen"
            PropertyChanges {
                target: webViewContainer
                visible: false
            }
            PropertyChanges {
                target: splashscreen
                visible: true
            }
        }
    ]
    transitions: Transition {
        RotationAnimation { duration: 500; direction: RotationAnimation.Shortest }
    }
}
