/* global $  */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import i18n from 'i18n';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

Ember.Handlebars.registerBoundHelper('t', i18n.t);

loadInitializers(App, config.modulePrefix);

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
