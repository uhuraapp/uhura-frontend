/* global MediaElementPlayer */

import Ember from 'ember';

export default Ember.Service.extend({
  playing: false,
  current: null,
  media: null,

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
      success: Ember.$.proxy(this.successMedia, this),
      error:  Ember.$.proxy(this.errorMedia, this)
    });
    this.set('media', media);
    return media;
  },

  successMedia () {
  },

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
    if (media) {
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
