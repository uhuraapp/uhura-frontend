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
    var media = new MediaElementPlayer(el, {
      features: ['playpause','progress','volume','duration'],
      audioVolume: 'vertical',
      success: Ember.$.proxy(this.successMedia, this)
    });
    this.set('media', media);
  },

  successMedia () {

  },

  stop () {
  },

  _current () {
    return this.get('current');
  },

  _tooglePlaying () {
    var currentStatus = this._current().get('playing');
    this._current().set('playing', !currentStatus);
    this.set('playing', !currentStatus);
  },

  _swap (episode) {
    if(this._current() && this._current().id !== episode.id) {
      this._current().set('playing', false);
    }

    this.set('current', episode);
  }
});
