/* global $ */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  setupController (a,b) {
    Ember.run.scheduleOnce('afterRender', this, function () {
      window.componentHandler.upgradeAllRegistered();
    });

    return this._super(a, b);
  }
});
