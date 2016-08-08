import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['episode', 'episode-card'],
  classNameBindings: ['isPlayed', 'isDownloaded', 'isPlaying'],
  rightActions: true,
  autoplayLink: false,
  autoplay: false,

  player: Ember.inject.service('player'),
  client: Ember.inject.service('uhura-client'),

  isPlayed: Ember.computed.bool('episode.played'),
  isPlaying: Ember.computed.bool('episode.playing'),

  didInitAttrs() {
    if (this.get('autoplay') === 'true') {
      Ember.run.scheduleOnce('afterRender', this, () => this.send('playpause'));
    }
  },

  actions: {
    playpause() {
      this.get('player').playpause(this.get('episode'));
    },

    played() {
      const episode = this.get('episode');
      const isPlayed = !!episode.get('played');
      const method = isPlayed ? 'DELETE' : 'POST';
      const episodeEndpoint = `channels/${episode.get('channel_id')}/episode`;


      episode.set('played', !isPlayed); // early visual response

      this.get('client').request(episodeEndpoint, episode.id, 'played', method).catch(() => {
        episode.set('played', isPlayed); // rollback
      });

      Ember.$('.more-itens .itens.open').removeClass('.open');
    },

    download() {
      const episodeID = this.get('episode.id');
      const downloadURL = this.get('client').buildURL('episode', episodeID, 'download');
      window.open(downloadURL);
    },

    more() {
      Ember.$('.itens.open').removeClass('open');
      this.$('.itens').addClass('open');
      Ember.run.later(function _later() {
        Ember.$(document).on('click.out-itens', 'body', function _clickOutItens(e) {
          Ember.$('.itens.open').removeClass('open');
          Ember.$(document).off('click.out-itens');
          e.stopPropagation();
        });
      }, 500);
    }
  }
});
