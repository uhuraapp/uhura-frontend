import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['episode'],
  classNameBindings: ['isPlayed', 'isDownloaded', 'isPlaying'],
  rightActions: true,

  player: Ember.inject.service('player'),

  isPlayed: Ember.computed.bool('episode.played'),
  isDownloaded: Ember.computed.bool('episode.downloaded'),
  isPlaying: Ember.computed.bool('episode.playing'),

  actions: {
    playpause() {
      this.get('player').playpause(this.get('episode'));
    },

    maskAsPlayed() {
      this.get('episode').set('makeListened', new Date());
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
