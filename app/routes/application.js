import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import AhoyApplicationRouteMiin from 'ember-ahoy/mixins/application-route-mixin';

const { inject: { service } } = Ember;

export default Ember.Route.extend(ApplicationRouteMixin, AhoyApplicationRouteMiin, {
  session: service('session'),
  actions: {
    // TODO: remove it
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
