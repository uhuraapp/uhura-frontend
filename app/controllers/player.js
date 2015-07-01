import Ember from 'ember';

export default Ember.Controller.extend({
  player: Ember.inject.service('player'),
  episode: Ember.computed.alias('player.current') ,

  actions: {
    playpause (episode) {
      this.get('player').playpause(episode);
    }
  }
});
