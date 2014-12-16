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


  ENV.API_URL = "http://127.0.0.1:3000"

  ENV.contentSecurityPolicy = {
    'img-src': "'self' *",
    'media-src': "'self' *",
    'content-src': "'self' *",
    'font-src': "'self' http://fonts.gstatic.com",
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com",
  }

  ENV['simple-auth'] = {
    authorizer: 'authorizer:uhura',
    crossOriginWhitelist: [ENV.API_URL]
  }

  if (environment === 'development') {
    ENV.APP.LOG_RESOLVER = false;
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
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
  }

  return ENV;
};
