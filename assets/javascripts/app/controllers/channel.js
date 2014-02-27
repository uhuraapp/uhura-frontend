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
