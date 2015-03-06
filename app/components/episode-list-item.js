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
      var url = Config.API_URL + '/v2/episodes/' + this.get('episode').id + '/listened';
      var episode = this.get('episode');
      ( episode.get('listened') ? $.ajax({url:url, type: "DELETE"}) : $.post(url) ).then(function(){
        episode.set('listened', !episode.get('listened'));
      });
    }
  }
});
