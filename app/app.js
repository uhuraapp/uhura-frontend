/* global $  */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import tHelper from './helpers/t';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});


loadInitializers(App, config.modulePrefix);

Ember.Handlebars.registerBoundHelper('t', tHelper);


$(document).ready(function(){
  'use strict';
  $(window).on('resize', fixSidebarHeight);
});


var fixSidebarHeight;
window.fixSidebarHeight = fixSidebarHeight = function(){
  'use strict';
  $('aside').css('height', window.innerHeight + 'px');
  $('#aside-wrapper').css('height', window.innerHeight + 'px');
};


export default App;
