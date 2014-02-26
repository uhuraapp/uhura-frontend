var CHANNEL = {}
var getChannels = function(route, controller){
  route.store.find('channel', params).then(function(channels){
    controller.set('channels', channels)
  });
}

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller) {
    getChannels(this, controller)
  }
});

App.IndexRoute = Ember.Route.extend({
  setupController: function(controller) {
    getChannels(this, controller)
  }
});
