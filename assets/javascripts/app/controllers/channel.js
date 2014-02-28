App.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.channel_id);
  },

  activate: function(){
    var title = this.modelFor('channel').get('title')

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
});


App.ChannelController = Ember.ObjectController.extend({
  episodes: (function() {
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      sortProperties: ['published_at'],
      sortAscending: false,
      content: this.get('content.episodes')
    });
  }).property('content.episodes'),
});
