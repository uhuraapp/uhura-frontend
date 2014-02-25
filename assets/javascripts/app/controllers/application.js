App.ApplicationRoute = Ember.Route.extend({
   setupController: function(controller) {
    this.store.find('channel').then(function(channels){
      controller.set('channels', channels)
    });
  }
});
