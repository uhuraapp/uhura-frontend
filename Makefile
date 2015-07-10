store:
	ember cordova:build --platform=android --environment=production
	cd cordova/platforms/android
	jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key-release.keystore ant-build/CordovaApp-release-unsigned.apk Uhura
	jarsigner -verify -verbose -certs ant-build/CordovaApp-release-unsigned.apk
	zipalign -v 4 ant-build/CordovaApp-release-unsigned.apk Uhura-store.apk
