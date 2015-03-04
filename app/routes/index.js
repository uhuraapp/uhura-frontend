import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    if(this.get('session.isAuthenticated')) {
      var routeA = this.container.lookup("route:application");
      var controllerA = this.container.lookup("controller:application");
      var __this = this;
      routeA.model().then(function(data){
        if(data.get('length') > 0){
          controllerA.set("model", data);
        } else {
          __this.transitionTo('channels');
        }
      });
    } else {
      this.transitionTo('login');
    }
  }
});
