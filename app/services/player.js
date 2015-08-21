/* global MediaElementPlayer */

import Ember from 'ember';

export default Ember.Service.extend({
  playing: false,
  current: null,
  media: null,

  PLAYED_PERCENT: 95,

  playpause(episode) {
    this._swap(episode);
    this._tooglePlaying();
  },

  createMedia(el) {
    let source = this.get('current.source');
    this._audioElement().attr('src', source);

    let media = new MediaElementPlayer(el, {
      features: ['current', 'duration', 'progress','volume'],
      audioVolume: 'vertical',
      plugins: ['flash','silverlight'],
      enablePluginDebug: true,
      pluginPath: 'assets/',
      success: this._proxy(this.successMedia),
      error:  this._proxy(this.errorMedia)
    });
    this.set('mediaPlayer', media);
    return media;
  },

  _proxy(method) {
    return Ember.$.proxy(method, this);
  },

  successMedia(media) {
    // media.addEventListener('play',       this.proxy(this._toogleStatus));
    // media.addEventListener('pause',      this.proxy(this._toogleStatus));
    this.set('media', media);
    media.addEventListener('ended',      this._proxy(this._ended));
    media.addEventListener('timeupdate', this._proxy(this._trackTime));
    media.addEventListener('loadeddata', this._proxy(this._loadedData));
  },

  _ended() {
    let episodesElements = Ember.$('li.episode').get().reverse();
    for (let i = 0; i <= episodesElements.length; i++) {
      let episodeElement = Ember.$(episodesElements[i]);
      if (!(episodeElement.is('.is-playing') || episodeElement.is('.is-played'))) {
        episodeElement.find('.playpause').click();
        break;
      }
    }
  },

  _trackTime() {
    let media = this.get('media');
    let currentTime = parseInt(media.currentTime, 10);
    if (media && this._isTimeToPing(currentTime)) {
      this._ping(this.get('current'), currentTime);
    }
    if (media && this._isPlayed(media) && !this.get('current.played') && !this._locked) {
      this._locked = true;
      this._played(this.get('current')).then(() => this._locked = false);
    }
  },

  _loadedData() {
    let time = this._current().get('stopped_at');
    this.get('mediaPlayer').setCurrentTime(time);
  },

  _isTimeToPing(currentTime) {
    return currentTime % 5 === 0;
  },

  _isPlayed(media) {
    let played = 100 * media.currentTime / media.duration;
    return played >= this.PLAYED_PERCENT;
  },

  _ping(episode, currentTime) {
    if (currentTime === this.get('currentTime')) {
      return;
    }
    this.set('currentTime', currentTime);

    let data = { at: currentTime };
    this._request('episode', episode.id, 'listen',
                  'PUT',
                  { data }
                 ).then(() => {
                   episode.set('stopped_at', currentTime);
                 });
  },

  _played(episode) {
    return this._request('episode', episode.id, 'played',
                  'POST'
                 ).then(() => {
                   episode.set('played', true);
                 });
  },

  _adapter() {
    return this.container.lookup('adapter:application');
  },

  _request(modelName, id, action, type, options) {
    let url = `${this._adapter().buildURL(modelName, id)}/${action}`;
    return this._adapter().ajax(url, type, options);
  },

  errorMedia() {
    let audioURL = this.get('current.source_url');
    let type = window.mejs.HtmlMediaElementShim.formatType(audioURL);
    let flashVersion = this._needPluginVersion('flash');
    let silverlightVersion = this._needPluginVersion('silverlight');

    // TODO: use a notification service
    window.alert(`We can play the audio, make sure your browser can play ${type} or if you have the flash ${flashVersion} or silverlight ${silverlightVersion} installed`);
    Ember.run.scheduleOnce('afterRender', this, 'stop');
  },

  _needPluginVersion(plugin) {
    let [{ version }] = window.mejs.plugins[plugin];
    // silverlight version sometimes came 3.0.0 and others 3.0
    if (version[version.length - 1] === 0 && version.length === 3) {
      version.pop();
    }
    return version.join('.');
  },

  _audioElement() {
    return Ember.$('#wrapper-audio-element audio');
  },

  _forceStop() {
    let audioElement = this._audioElement().get(0);
    if (audioElement) {
      if (audioElement.pause) {
        audioElement.pause(0);
      }
      audioElement.src = '';
      if (audioElement.load) {
        audioElement.load();
      }
    }
    let media = this.get('mediaPlayer');
    if (media && media.remove) {
      media.remove();
    }
  },

  stop() {
    if (this._current()) {
      this._current().set('playing', false);
    }
    this.set('playing', false);
    this.set('current', null);
    this._forceStop();
  },

  _current() {
    return this.get('current');
  },

  _tooglePlaying() {
    let currentStatus = this._current().get('playing');
    let action = currentStatus ? 'pause' : 'play';
    this._current().set('playing', !currentStatus);
    this.set('playing', !currentStatus);
    this[`_${action}`]();
  },

  _play() {
    this.get('mediaPlayer').play();
  },

  _pause() {
    this.get('mediaPlayer').pause();
  },

  _swap(episode) {
    if (!this._current() || this._current().id !== episode.id) {
      this.stop();
      this.set('current', episode);
      this.createMedia(this._audioElement());
    }
  }
});
