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
  $(document).on("click", '.more-info', showDescription);
});

var fixedSidebarHeight = function(){
    'use strict';

  $('#side-left').css('height', window.innerHeight + 'px');
  $('#content').css('height', window.innerHeight + 'px');
};

var showDescription = function(e){
  'use strict';

  var target = $(e.currentTarget),
    description = target.next('.description'),
    descriptionIsDisplayed = description.is(':visible');

    $('.description').slideUp();

    if(!descriptionIsDisplayed){
      description.slideDown();
    }
};
