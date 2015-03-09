/* global $ */
import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ['episode'],
  classNameBindings: ["isListened", "isDownloaded"],
  isListened: function() {
    return this.get('episode.listened');
  }.property('episode.listened'),
  isDownloaded: function() {
    return this.get('episode.downloaded');
  }.property('episode.downloaded'),
  episodeDidChange: function() {
    if(this.get('episode')) {
      var downloader = this.container.lookup('controller:downloader');
      downloader.check(this.get('episode'));
    }
  }.observes('episode').on('init'),
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
      var episode = this.get('episode'),
          downloader = this.container.lookup('controller:downloader');
      if(episode.get('downloaded')){
        downloader.remove(episode);
      } else {
        downloader.start(episode);
      }
    },
    listened: function() {
      var episode = this.get('episode'),
          url = config.API_URL + '/v2/episodes/' + episode.id + '/listened',
          method = this.get('episode') ? "POST" : "DELETE";
      $.ajax({ url:url, type: method }).then(function(){
        episode.set('listened', !episode.get('listened'));
      });
    }
  }
});
