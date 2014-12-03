/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ["episode"],
  actions: {
    info: function() {
      var t = $(event.target);
      t.toggleClass('active');
      t.parents('li').find('.description').toggleClass('uk-hidden');
    },
    playpause: function() {
      var player = this.container.lookup('controller:Player');
      player.set('model', this.get('episode'));
      player.send('playpause');
    }
  }
});
