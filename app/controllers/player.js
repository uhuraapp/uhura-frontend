import Ember from 'ember';
// import config from '../config/environment';

export default Ember.Controller.extend({
  // _locked: true,
  // playing: false,
  // episodeLoaded: false,
  // loaded: false,
  // player: null,

  // playpause: function (episode) {
  //   this.set('_locked', true);
  //   if(this.get('model') && episode.id === this.get('model').id) {
  //     this.__playpause();
  //   } else {
  //     if(this.canPlay(episode)){
  //       this.__play(episode);
  //     } else {
  //       UIkit.modal.confirm("You don't download this episode. Are you sure you want play the episode?", () => {
  //         this.__play(episode);
  //       });
  //     }
  //   }
  // },

  // canPlay(episode) {
  //   if(window.cordova) { // TODO: check if is on Wifi
  //     return !!episode.get('downloaded');
  //   } else {
  //     return true;
  //   }
  // },

  // __playpause: function () {
  //   var action = this.get('playing') ? 'pause' : 'play';
  //   this.get('player').media[action]();
  //   this.set('playing', !this.get('playing'));
  // },
  //
  // __play: function (episode) {
  //   if(this.get('model')) { this.get('model').set('playing', false); }
  //   this.set('loaded', false);
  //
  //   this.set('modelx', episode);
  // },

  x: function () {
    var m = this.get('model');
    console.log(m);
  }.observes('model'),

  // playerChanges: function () {
  //   if(this.get('player')) {
  //     this.get('player').media.play();
  //     this.set('playing', true);
  //   }
  // }.observes('player'),
  //
  // playerTimeUpdate: function () {
  //   var model = this.get('model');
  //   if(model){ model.set('makeListened', true); }
  // },

  // playerLoadedData: function () {
  //   this.get('player').setCurrentTime(this.get('model.stopped_at'));
  //   this.set('loaded', true);
  //   this.set('_locked', false);
  // },

  // playerPlayOrPause: function () {
  //   this.get('model').set('playing', !this.get('model.playing'));
  // },

  // playerEnded: function () {
  //   this.get('model').set('playing', false);
  //   this.set('loaded', false);
  //   this.set('playing', false);
  //   if(window.cordova){ cordova.plugins.backgroundMode.disable(); }
  // },

  // updateAudio: function () {
  //   if(window.cordova){
  //     cordova.plugins.backgroundMode.enable();
  //     cordova.plugins.backgroundMode.onactivate = () => {
  //       cordova.plugins.backgroundMode.configure({
  //         title: this.get('model.title'),
  //         text:  this.get('model.channel.title')
  //       });
  //     };
  //   }
  // },

  // stoppedAtChanged: function () {
  //   var episode = this.get('model');
  //   if(this.get('session.isAuthenticated') && episode) {
  //     var at = episode.get('stopped_at');
  //     if(at && !this.get('_locked')) {
  //       this.set('_locked', true);
  //       $.ajax({
  //         url: config.API_URL + '/v2/episodes/' + episode.id + '/listen',
  //         type: "PUT",
  //         data: { at: at }
  //       }).always(() => {
  //         this.set('_locked', false);
  //       });
  //     }
  //   }
  // }.observes('model.stopped_at'),

  actions: {
     playpause: function () {
       // this.playpause(this.get('model'));
     }
  }
});
