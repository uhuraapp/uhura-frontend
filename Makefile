EMBER_VERSION = beta
EMBER_DATA_VERSION = 1.0.0-beta.15
EMBER_CLI_VERSION = 0.2.1

build:
	ember cordova:build --platform=android
	adb shell pm uninstall -k io.uhura.app
	ember cordova run android

store:
	ember cordova:build --platform=android --environment=production
	cd cordova/platforms/android
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key-release.keystore ant-build/CordovaApp-release-unsigned.apk Uhura
	jarsigner -verify -verbose -certs ant-build/CordovaApp-release-unsigned.apk
	zipalign -v 4 ant-build/CordovaApp-release-unsigned.apk Uhura-store.apk


upgrade:
	sudo npm uninstall -g ember-cli
	npm cache clean
	bower cache clean
	sudo npm install -g ember-cli#$(EMBER_CLI_VERSION)
	rm -Rf node_modules bower_components dist tmp
	npm install --save-dev ember-cli#$(EMBER_CLI_VERSION)
	bower install --save ember#$(EMBER_VERSION)
	bower install --save ember-data#$(EMBER_DATA_VERSION)
	npm install
	bower install
	ember init
