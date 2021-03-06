import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import MaterialDesignMixin from '../../mixins/routes/material-design';

const { service } = Ember.inject;

export default Ember.Route.extend(AuthenticatedRouteMixin, MaterialDesignMixin, {
  account: service('session-account'),

  model() {
    return this.store.findAll('subscription', { reload: true });
  },

  actions: {
    createProfile() {
      const profile = this.store.createRecord('profile', {});
      profile.save().then((data) => {
        this.get('account').set('profileID', data.get('id'));
      });
    }
  }
});
