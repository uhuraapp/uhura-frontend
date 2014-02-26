/* global Ember, DS, $ */

var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

$(document).ready(function(){
  'use strict';
  $(window).on('resize', fixedSidebarHeight);
  fixedSidebarHeight();
  $('.more-info').on('click', showDescription);
});

var fixedSidebarHeight = function(){
    'use strict';

  $('#side-left').css('height', window.innerHeight + 'px');
  $('#content').css('height', window.innerHeight + 'px');
};

var showDescription = function(e){
  'use strict';

  debugger
  $('.description').slideUp();
  $(e.currentTarget).parent().find('.description').slideDown();
};
