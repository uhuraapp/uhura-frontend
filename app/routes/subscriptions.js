import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import MaterialDesignMixin from '../mixins/routes/material-design';
import TitledMixin from '../mixins/routes/titled';

export default Ember.Route.extend(TitledMixin, AuthenticatedRouteMixin, MaterialDesignMixin, {
  model() {
    return this.store.findAll('subscription');
  },

  actions: {
    createProfile() {
      const profile = this.store.createRecord('profile', {});
      profile.save();
    }
  }
});
