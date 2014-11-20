/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var compileSass = require('broccoli-sass');


var app = new EmberApp();

app.import("bower_components/jquery.cookie/jquery.cookie.js");

app.import("bower_components/uikit/scss/uikit.scss");
app.import("bower_components/uikit/js/uikit.js");

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



var tree = app.toTree();
module.exports = tree;

compileSass([tree], 'assets/app.sass', 'assets/app.css');
