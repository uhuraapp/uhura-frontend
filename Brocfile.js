/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var compileSass = require('broccoli-sass');

var writeManifest = require('broccoli-manifest');
var mergeTrees = require('broccoli-merge-trees');

var app = new EmberApp({
  fingerprint: {
    exclude: "uhura120.png"
  }
});

app.import("bower_components/uikit/scss/uikit.scss");
app.import("bower_components/uikit/js/uikit.js");

app.import("bower_components/mediaelement/build/mediaelement-and-player.js");
app.import("bower_components/mediaelement/build/mediaelementplayer.css");

app.import("bower_components/mediaelement/build/flashmediaelement.swf", {destDir: 'assets'});
app.import("bower_components/mediaelement/build/silverlightmediaelement.xap", {destDir: 'assets'});

app.import("bower_components/mediaelement/build/controls.svg", {destDir: 'assets'});
app.import("bower_components/mediaelement/build/controls.fw.png", {destDir: 'assets'});
app.import("bower_components/mediaelement/build/controls.png", {destDir: 'assets'});
app.import("bower_components/mediaelement/build/controls-wmp.png", {destDir: 'assets'});
app.import("bower_components/mediaelement/build/controls-wmp-bg.png", {destDir: 'assets'});

app.import("bower_components/typicons/src/font/typicons.css", {destDir: 'assets'});
app.import("bower_components/typicons/src/font/typicons.ttf", {destDir: 'assets'});
app.import("bower_components/typicons/src/font/typicons.svg", {destDir: 'assets'});
app.import("bower_components/typicons/src/font/typicons.eot", {destDir: 'assets'});
app.import("bower_components/typicons/src/font/typicons.woff", {destDir: 'assets'});

app.import("bower_components/font-awesome/css/font-awesome.css");
app.import("bower_components/font-awesome/fonts/FontAwesome.otf", {destDir: 'fonts'});
app.import("bower_components/font-awesome/fonts/fontawesome-webfont.svg", {destDir: 'fonts'});
app.import("bower_components/font-awesome/fonts/fontawesome-webfont.ttf", {destDir: 'fonts'});
app.import("bower_components/font-awesome/fonts/fontawesome-webfont.woff", {destDir: 'fonts'});
app.import("bower_components/font-awesome/fonts/fontawesome-webfont.eot", {destDir: 'fonts'});

app.import("bower_components/db.js/src/db.js");

app.import("bower_components/uhura-i18n/dist/i18n.amd.js", {
  exports: {
    "i18n": [
      "default",
      "lang/pt"
    ],
  }
});

var tree = app.toTree();

compileSass([tree], 'assets/app.sass', 'assets/app.css');

module.exports = mergeTrees([tree, writeManifest(tree)], {overwrite: true});
