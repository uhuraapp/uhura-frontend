import Ember from 'ember';
import computed from 'ember-computed-decorators';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ['episode'],
  classNameBindings: ["isPlayed", "isDownloaded"],
  rightActions: true,

  @computed('episode.listened')
  isPlayed (listened) {
    return listened;
  },

  @computed('episode.downloaded')
  isDownloaded (downloaded) {
    return downloaded;
  },

  actions: {
    playpause () {
      var player = this.container.lookup('controller:Player');
      player.playpause(this.get('episode'));
    },

    maskAsPlayed () {
      this.get('episode').set('makeListened', new Date());
      Ember.$(".more-itens .itens.open").removeClass('.open');
    },

    info () {
      Ember.$('.itens.open').removeClass('open');
      this.$('.itens').addClass('open');
      Ember.run.later(function () {
        Ember.$(document).on('click.out-itens', 'body', function(e) {
          Ember.$('.itens.open').removeClass('open');
          Ember.$(document).off('click.out-itens');
          e.stopPropagation();
        });
      }, 500);
    }
  }
});
