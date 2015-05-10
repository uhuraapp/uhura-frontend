/* global Share */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ['episode'],
  classNameBindings: ["isListened", "isDownloaded"],
  share: true,
  generateEpisodeURL: function () {
    var path = this.$("a.more-info").attr('href').replace("#", "");
    return `http://uhura.io${path}`;
  },

  shareTitle: function () {
    return this.get('episode.title');
  },
  addShare: function () {
    if(this.get('share')) {
      if(window.cordova) {
        Ember.$('div.share-button').hide();
      } else {
        Ember.$('button.share-button').hide();
        new Share("#share-button-" + this.get('episode.id'), {
          url: this.generateEpisodeURL(),
          description: this.shareTitle().replace("#", "%23"),
          ui: {
            flyout: "top left",
            button_text: ""
          },
          networks: {
            pinterest: {
              enabled: false
            }
          }
        });
      }
    }
  }.on('didInsertElement'),
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
      this.get('episode').set('makeListened', new Date());
    },
    share: function () {
      window.plugins.socialsharing.share(
        this.shareTitle(),
        null,
        this.get('episode.channel.image_url'),
        this.generateEpisodeURL());
    }
  }
});
