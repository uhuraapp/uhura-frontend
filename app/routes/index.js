/* global fixSidebarHeight */
import Ember from 'ember';
import ChannelService from '../services/channel';

export default Ember.Route.extend({
  activate: function() {
    setTimeout(fixSidebarHeight, 20);
  },
  beforeModel: function() {
    if(!this.get('session.isAuthenticated')) {
      this.transitionTo("login");
    } else {
      var routeA = this.container.lookup("route:application");
      var controllerA = this.container.lookup("controller:application");
      routeA.model().then(function(data){ controllerA.set("model", data); });
    }
  },
  model: function() {
    return (new ChannelService).top();
  }
});
