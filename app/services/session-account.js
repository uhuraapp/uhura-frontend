import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),
  client: service('uhura-client'),
  profileID: null,

  account: Ember.computed('session.data.authenticated.id', 'profileID', function() {
    const userId = this.get('session.data.authenticated.id');
    if (!Ember.isEmpty(userId)) {
      return DS.PromiseObject.create({
        promise: this.get('client').request('', 'me').then((data) => {
          const { profile: { id } } = data;
          return this.get('store').find('profile', id).catch(() => false);
        })
      });
    }
  })
});
