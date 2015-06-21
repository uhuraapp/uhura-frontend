import Ember from 'ember';

export default Ember.Service.extend({
  playing: false,

  playpause (episode) {
    this._swap(episode);
    this._tooglePlaying();
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
