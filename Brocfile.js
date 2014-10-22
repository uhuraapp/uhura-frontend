/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var compileSass = require('broccoli-sass');


var app = new EmberApp();

app.import("bower_components/jquery.cookie/jquery.cookie.js");
app.import("bower_components/uikit/scss/uikit.scss");

var tree = app.toTree();
module.exports = tree;

compileSass([tree], 'assets/app.sass', 'assets/app.css');
