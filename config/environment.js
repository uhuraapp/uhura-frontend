/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'uhuraapp',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };


  ENV.contentSecurityPolicy = {
    'img-src': "'self' *",
    'media-src': "'self' *",
    'content-src': "'self' *",
    'font-src': "'self' http://fonts.gstatic.com",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
  }

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.API_URL = "http://127.0.0.1:3000"
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.API_URL = "http://uhura-api.herokuapp.com"
  }

  return ENV;
};
