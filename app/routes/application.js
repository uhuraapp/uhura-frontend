import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { service } = Ember.inject;

export default Ember.Route.extend(ApplicationRouteMixin, {
  session: service('session'),
  actions: {
    // TODO: remove it
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
