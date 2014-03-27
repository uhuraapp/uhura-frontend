App.ApplicationRoute = Ember.Route.extend({
  model: function(){
    'use strict';
    return this.store.find('subscription');
  },
  activate: function(){
    var title = "Dashboard - Uhura App";

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    var _this = this;
    jQuery.getJSON("/api/suggestions").then(function (data) {
      for (var i = data.channels.length - 1; i >= 0; i--) {
        c = data.channels[i]
        episodes = _.where(data.episodes, {channel_id: c.id});
        c.episodes = _.map(episodes, function(e){
          return _this.store.push('episode', e);
        });
         data.channels[i] = c
      };

      controller.set('channels', data.channels)
    });
  }
});
