/* global $ */
import Ember from 'ember';

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
      // var downloader = this.container.lookup('controller:downloader');
      // downloader.check(this.get('episode'));
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
      player.playpause(this.get('episode'));
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
      this.get('episode').set('makeListened', new Date);
    }
  }
});
