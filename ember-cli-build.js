/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    fingerprint: {
      exclude: ['channel-placeholder.png', 'radio.gif']
    },
    sassOptions: {
      extentions: 'sass'
    }
  });

  app.import('bower_components/mediaelement/build/mediaelementplayer.css');

  app.import('bower_components/material-design-lite/material.js');
  app.import('bower_components/moment/moment.js');
  app.import('bower_components/mediaelement/build/mediaelement-and-player.js');

  app.import('bower_components/mediaelement/build/controls.svg', { destDir: 'assets' });

  return app.toTree();
};
