import Ember from 'ember';

export default Ember.ObjectController.extend({
  playing: false,
  episodeLoaded: false,
  loaded: false,
  player: null,
  playpause: function (episode) {
    if(this.get('model') && episode.id === this.get('model').id) {
      var action = this.get('playing') ? 'pause' : 'play';
      this.get('player').media[action]();
      this.set('playing', !this.get('playing'));
    } else {
      if(this.get('model')) { this.get('model').set('playing', false); }
      this.set('loaded', false);
      this.set('model', episode);
    }
  },

  playerChanges: function () {
    if(this.get('player')) {
      this.get('player').media.play();
      this.set('playing', true);
    }
  }.observes('player'),

  playerTimeUpdate: function () {
    this.get('model').set('makeListened', true);
  },

  playerLoadedData: function () {
    this.set('loaded', true);
  },

  playerPlayOrPause: function () {
    this.get('model').set('playing', !this.get('model.playing'));
  },

  playerEnded: function () {
    if(window.cordova){ cordova.plugins.backgroundMode.disable(); }
  },

  playerBindEvents: function () {
    if(window.cordova) {
      cordova.plugins.backgroundMode.onactivate = () => {
        cordova.plugins.backgroundMode.configure({
          title: this.get('model.title'),
          text:  this.get('model.channel.title')
        });
      };
    }
  },

  updateAudio: function () {
    if(window.cordova && !cordova.plugins.backgroundMode.isEnabled()){
      cordova.plugins.backgroundMode.enable();
    }
  },

  actions: {
    playpause: function () {
      this.playpause(this.get('model'));
    }
  }
});
