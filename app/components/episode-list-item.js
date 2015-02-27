/* global $ */
import Ember from 'ember';
import Config from '../config/environment';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ['episode'],
  classNameBindings: ["isListened"],
  isListened: function() {
    return this.get('episode.listened');
  }.property('episode.listened'),
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
    },
    download: function() {
      var url = Config.API_URL + "/api/v2/episodes/" +this.get('episode').id + "/download";
      window.open(url,'','');
    },
    listened: function() {
      this.get('episode').set('listened', true);
    }
  }
});
