import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  store: service('store'),
  classNames: ['subscribe-button-component'],
  makeSubscription() {
    let model = this.get('channel');
    this.get('store').createRecord('subscription', {
      channel_id: model.id,
      episodes: []
    }).save().then(function() {
      model.set('subscribed', true);
    });
  },
  actions: {
    subscribe() {
      if (this.get('session.isAuthenticated')) {
        this.makeSubscription();
      } else {
        this.container.lookup('route:application').transitionTo('login');
      }
    },
    unsubscribe() {
      let model = this.get('channel');
      this.get('store').find('subscription', model.id).then(function(subscription) {
        subscription.destroyRecord();
        model.set('subscribed', false);
      });
    }
  }
});
