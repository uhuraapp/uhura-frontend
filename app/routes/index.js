import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.get('session.isAuthenticated')) {
      var routeA = this.container.lookup("route:application");
      var controllerA = this.container.lookup("controller:application");
      routeA.model().then(function(data){ controllerA.set("model", data); });
    }
  }
});
