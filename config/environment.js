/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'uhuraapp',
    environment: environment,
    baseURL: '/',
    locationType: process.env.EMBER_CLI_ELECTRON ? 'hash' : 'auto',
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
    },

    'ember-cli-mirage': {
      enabled: environment === 'test'
    }
  };

  // ENV.API_URL = "http://localhost:3000"
  ENV.API_URL = "https://api.uhura.io";

  ENV.contentSecurityPolicy = {
    'img-src': "'self' *",
    'default-src': "'self' *",
    'connect-src': "'self' *",
    'media-src': "'self' *",
    'content-src': "'self' *",
    'font-src': "'self' http://fonts.gstatic.com https://www.sharebutton.co" ,
    'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://www.sharebutton.co"
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
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
    ENV.rollbar = {
      accessToken: 'dc69607d27854abfa59a0d1698f03b76'
    };
  }

  ENV['platform'] = process.env.EMBER_CLI_ELECTRON ? 'electron' : 'web';

  ENV['ember-simple-auth'] = {
    store: 'session-store:local-storage',
    crossOriginWhitelist: [ENV.API_URL],
    routeAfterAuthentication: 'subscriptions'
  };

  const ahoyServer = process.env.AHOY_ENDPOINT || '';

  ENV['ahoy'] = {
    debug: environment === 'development',
    visitsUrl: `${ahoyServer}/ahoy/visits`,
    eventsUrl: `${ahoyServer}/ahoy/events`
  };

  return ENV;
};
