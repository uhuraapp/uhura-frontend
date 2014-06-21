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
  $(document).on('click', '.more-info', showDescription);
  $(document).on('mouseenter mouseleave', '.unsubscribe', toggleHoverUnsubscribe);
  $(document).on('click', '#toggle-screen', toggleScreen);
  $(document).on('click', '#player-loader',  App.PLAYER.seek);
});

var toggleScreen = function() {
  $("#aside-wrapper").toggleClass("uk-animation-slide-left uk-animation-reverse");
  setTimeout(function(){
    $("#content").toggleClass("nine-twelfth");
    $("#content").toggleClass("full");
    $("#aside-wrapper").toggleClass("uk-hidden");
  }, 100);
};

var fixedSidebarHeight = function(){
  'use strict';
  $('aside').css('height', window.innerHeight + 'px');
  $('#aside-wrapper').css('height', window.innerHeight + 'px');
};

var showDescription = function(e){
  'use strict';

  var target = $(e.currentTarget),
    description = target.parents('.title').next('.description'),
    descriptionIsDisplayed = description.is(':visible');

    $('.description').slideUp();

    if(!descriptionIsDisplayed){
      description.slideDown();
    }
};

var toggleHoverUnsubscribe = function(e) {
  var target = $(e.currentTarget);
  target.toggleClass("uk-button-danger");
  if(target.is(".uk-button-danger")){
    label = window.t.get('channel_new.button.unsubscribe');
  } else {
    label = window.t.get('channel_new.button.subscribed');
  }
  target.toggleClass('fa-times');
  target.toggleClass('fa-check');
  target.text(label);
};
