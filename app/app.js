/* global $  */
import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

loadInitializers(App, config.modulePrefix);

// TODO: add fixSidebar to a external lib
$(document).ready(function(){
  'use strict';
  $(window).on('resize', fixSidebarHeight);
  setTimeout(fixSidebarHeight, 5);
});

var fixSidebarHeight;
window.fixSidebarHeight = fixSidebarHeight = function(){
  'use strict';
  $('aside').css('height', window.innerHeight + 'px');
  $('#aside-wrapper').css('height', window.innerHeight + 'px');
};

export default App;
