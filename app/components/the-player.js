import Ember from 'ember';

export default Ember.Component.extend({
  player: Ember.inject.service('player'),
  classNames: ['player-wrapper'],
  classNameBindings: ['hasModel'],
  hasModel: Ember.computed.bool('controller.player.current'),

  autoplay: Ember.computed.alias('controller.player.autoplay'),

  episode: Ember.computed.alias('player.current'),

  actions: {
    playpause() {
      let player = this.get('player');
      let episode = this.get('episode');
      player.playpause(episode);
    }
  }
});
