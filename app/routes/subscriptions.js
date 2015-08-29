import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import MaterialDesignMixin from '../mixins/routes/material-design';

export default Ember.Route.extend(AuthenticatedRouteMixin, MaterialDesignMixin, {
  model() {
    return this.store.findAll('subscription');
  }
});
