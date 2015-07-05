/* global MediaElementPlayer */

import Ember from 'ember';

export default Ember.Service.extend({
  playing: false,
  current: null,
  media: null,

  PLAYED_PERCENT: 95,

  playpause (episode) {
    this._swap(episode);
    this._tooglePlaying();
  },

  createMedia (el) {
    var source = this.get('current.source');
    this._audioElement().attr('src', source);

    var media = new MediaElementPlayer(el, {
      features: ['current', 'duration', 'progress','volume'],
      audioVolume: 'vertical',
      plugins: ['flash','silverlight'],
      enablePluginDebug: true,
      pluginPath: 'assets/',
      success: this._proxy(this.successMedia),
      error:  this._proxy(this.errorMedia)
    });
    this.set('media', media);
    return media;
  },

  _proxy (method) {
    return Ember.$.proxy(method, this);
  },

  successMedia (media) {
    // TODO: add tests
    // media.addEventListener('loadeddata', this.proxy(this.__loadedData));
    // media.addEventListener('play',       this.proxy(this._toogleStatus));
    // media.addEventListener('pause',      this.proxy(this._toogleStatus));
    media.addEventListener('ended',      this._proxy(this._ended));
    media.addEventListener('timeupdate', this._proxy(this._trackTime));
  },

  _ended () {
    var episodesElements = Ember.$('li.episode').get().reverse();
    for (var i = 0; i <= episodesElements.length; i++) {
       var episodeElement = Ember.$(episodesElements[i]);
       if(!episodeElement.is(".is-playing")) {
         episodeElement.find('.playpause').click();
         break;
       }
    }

  },

  _trackTime () {
    var media = this.get('media');
    if(media && this._isTimeToPing(media)) {
      this._ping(this.get('current'), media.currentTime);
    }
    if(media && this._isPlayed(media)) {
      this._played(this.get('current'));
    }
  },

  _isTimeToPing (media) {
    return parseInt(media.currentTime, 10) % 5 === 0;
  },

  _isPlayed (media) {
    var played = 100 * media.currentTime / media.duration;
    return played >= this.PLAYED_PERCENT;
  },

  _ping (episode, currentTime) {
    let data = {at: currentTime};
    this._request('episode', episode.id, 'listen',
                  'PUT', {data: data}).then(() => {
                    episode.set('stopped_at', currentTime);
                  });
  },

  _played (episode) {
    episode.set('played', true);
  },

  _adapter () {
    return this.container.lookup('adapter:application');
  },

  _request (modelName, id, action, type, options) {
    let url = this._adapter().buildURL(modelName, id) + "/" + action;
    return this._adapter().ajax(url, type, options);
  },

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

  // __playerTimeUpdate: function () {
  //   var media = this.get('media');
  //   if(media && this.__isPingTime(media)) {
  //     var model = this.get('controller').get('model');
  //     if(model){
  //       model.set("stopped_at", parseInt(media.currentTime, 10));
  //     }
  //   }
  //
  //   if(media && this.__isConsideredListened(media)) {
  //     this.get('controller').playerTimeUpdate();
  //   }
  // },
  //
  // __loadedData: function () {
  //   this.get('controller').playerLoadedData();
  // },
  //
  // __playorpause: function () {
  //   this.get('controller').playerPlayOrPause();
  // },
  //
  // __ended: function () {
  //   //this.get('controller').playerEnded();
  //   //this.set('hasModel', false);
  //
  //   var episodesElements = $('li.episode').get().reverse();
  //   for (var i = 0; i <= episodesElements.length; i++) {
  //     var episodeElement = $(episodesElements[i]);
  //     if(!episodeElement.is(".is-listened")) {
  //       episodeElement.find('.button-play-wrapper button').click();
  //       break;
  //     }
  //   }
  // },
  //
  // __isConsideredListened: function (media) {
  // },
  //
  // __isPingTime: function (media) {
  // }


  errorMedia () {
    var audioURL = this.get('current.source_url');
    var type = window.mejs.HtmlMediaElementShim.formatType(audioURL);
    var flashVersion = this.__needPluginVersion('flash');
    var silverlightVersion = this.__needPluginVersion('silverlight');

    // TODO: use a notification service
    window.alert(`We can play the audio, make sure your browser can play ${type} or if you have the flash ${flashVersion} or silverlight ${silverlightVersion} installed`);
    Ember.run.scheduleOnce('afterRender', this, 'stop');
  },

  __needPluginVersion (plugin) {
    var version = window.mejs.plugins[plugin][0].version;
    // silverlight version sometimes came 3.0.0 and others 3.0
    if(version[version.length - 1] === 0 && version.length === 3) {
      version.pop();
    }
    return version.join(".");
  },

  _audioElement () {
    return Ember.$("#wrapper-audio-element audio");
  },

  _forceStop () {
    var audioElement = this._audioElement().get(0);
    if(audioElement){
      if(audioElement.pause) {
        audioElement.pause(0);
      }
      audioElement.src = "";
      if(audioElement.load){
        audioElement.load();
      }
    }
    var media = this.get('media');
    if (media && media.remove) {
      media.remove();
    }
  },

  stop () {
    if(this._current()){
      this._current().set('playing', false);
    }
    this.set('playing', false);
    this.set('current', null);
    this._forceStop();
  },

  _current () {
    return this.get('current');
  },

  _tooglePlaying () {
    var currentStatus = this._current().get('playing');
    var action = currentStatus ? 'pause' : 'play';
    this._current().set('playing', !currentStatus);
    this.set('playing', !currentStatus);
    this[`_${action}`]();
  },

  _play () {
    this.get('media').play();
  },

  _pause () {
    this.get('media').pause();
  },

  _swap (episode) {
    if(!this._current() || this._current().id !== episode.id) {
      this.stop();
      this.set('current', episode);
      this.createMedia(this._audioElement());
    }
  }
});
