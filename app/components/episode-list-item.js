import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['episode'],
  classNameBindings: ['isPlayed', 'isDownloaded', 'isPlaying'],
  rightActions: true,

  player: Ember.inject.service('player'),
  client: Ember.inject.service('uhura-client'),

  isPlayed: Ember.computed.bool('episode.played'),
  isDownloaded: Ember.computed.bool('episode.downloaded'),
  isPlaying: Ember.computed.bool('episode.playing'),

  actions: {
    playpause() {
      this.get('player').playpause(this.get('episode'));
    },

    played() {
      let episode = this.get('episode');
      let isPlayed = !!episode.get('played');
      let method = isPlayed ? 'DELETE' : 'POST';

      episode.set('played', !isPlayed); // early visual response

      return this.get('client').request('episode', episode.id, 'played', method).catch(() => {
        episode.set('played', isPlayed); // rollback
      });

      Ember.$('.more-itens .itens.open').removeClass('.open');
    },

    info() {
      Ember.$('.itens.open').removeClass('open');
      this.$('.itens').addClass('open');
      Ember.run.later(function() {
        Ember.$(document).on('click.out-itens', 'body', function(e) {
          Ember.$('.itens.open').removeClass('open');
          Ember.$(document).off('click.out-itens');
          e.stopPropagation();
        });
      }, 500);
    }
  }
});
