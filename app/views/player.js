import Ember from 'ember';

export default Ember.View.extend({
  player: Ember.inject.service('player'),
  classNames: ["player-wrapper"],
  classNameBindings: ['hasModel'],
  hasModel: Ember.computed.bool('controller.player.current'),

  fixHeigthSize: function () {
    // TODO: fix display flex, this code keep player on screen view
    Ember.run.scheduleOnce('afterRender', () => {
      var navHeight = document.querySelector("nav") ? document.querySelector("nav").clientHeight : 0;
      var playerHeight = window.innerHeight - navHeight;
      Ember.$('.player-wrapper').height(playerHeight);
      Ember.$(document).on('scroll', () => Ember.$('.player-wrapper').css("top", window.pageYOffset));
    });
  }.on('didInsertElement'),
});
