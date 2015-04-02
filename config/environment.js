/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'uhuraapp',
    environment: environment,
    baseURL: '/',
    defaultLocationType: 'auto',
    EmberENV: {
      FEATURES: {
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    }
  };


  ENV.API_URL = "http://api.uhura.io"

  ENV.contentSecurityPolicy = {
    'img-src': "'self' *",
    'media-src': "'self' *",
    'content-src': "'self' *",
    'font-src': "'self' http://fonts.gstatic.com",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com"
  }

  ENV.sassOptions = {
    inputFile: "app.sass"
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  ENV['simple-auth'] = {
    authorizer: 'authorizer:uhura',
    crossOriginWhitelist: [ENV.API_URL]
  }

  return ENV;
};
