var CHANNEL = {}

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    this.store.find('channel').then(function(channels){
      controller.set('channels', channels)
    });
  }
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    jQuery.getJSON("/api/suggestions").then(function (data) {
      for (var i = data.channels.length - 1; i >= 0; i--) {
        c = data.channels[i]
        episodes = _.where(data.episodes, {channel_id: c.id});
        data.channels[i].episodes = _.map(episodes, function(e){
          return Ember.Object.create(e);
        });
      };

      controller.set('channels', data.channels)
    });
  }
});
