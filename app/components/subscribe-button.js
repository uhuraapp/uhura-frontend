import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  classNames: ['subscribe-button-component'],
  __store() {
    return this.container.lookup('store:main');
  },
  makeSubscription() {
    let model = this.get('channel');
    this.__store().createRecord('subscription', {
      channel_id: model.id
    }).save().then(function() {
      model.set('subscribed', true);
    });
  },
  actions: {
    subscribe() {
      if (this.get('session.isAuthenticated')) {
        this.makeSubscription();
      } else {
        const { container } = this;
        this.container.lookup('route:application').transitionTo('login');
      }
    },
    unsubscribe() {
      let model = this.get('channel');
      this.__store().find('subscription', model.id).then(function(subscription) {
        subscription.destroyRecord();
        model.set('subscribed', false);
      });
    }
  }
});
