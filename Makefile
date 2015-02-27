EMBER_VERSION = beta
EMBER_DATA_VERSION = 1.0.0-beta.15
EMBER_CLI_VERSION = 0.2.0-beta-1

upgrade:
	npm uninstall -g ember-cli
	npm cache clean
	bower cache clean
	npm install -g ember-cli#$(EMBER_CLI_VERSION)
	rm -Rf node_modules bower_components dist tmp
	npm install --save-dev ember-cli#$(EMBER_CLI_VERSION)
	bower install --save ember#$(EMBER_VERSION)
	bower install --save ember-data#$(EMBER_DATA_VERSION)
	npm install
	bower install
	ember init
