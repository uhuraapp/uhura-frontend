App.ChannelRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('channel', params.channel_uri);
  },
  serialize: function(model) {
    debugger
    console.log("333s")


    return { id: model.get('id') };
  },
  activate: function(){
    var title = this.modelFor('channel').get('title')

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
});
