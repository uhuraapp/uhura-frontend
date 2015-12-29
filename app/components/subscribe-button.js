import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: service('session'),
  store: service('store'),

  classNames: ['subscribe-button-component'],

  __isURL(id) {
    return id.match(/http:\/\//);
  },

  makeSubscription() {
    let model = this.get('channel');
    let data = { episodes: [] };

    if (this.__isURL(model.id)) {
      data.channel_url = model.id;
    } else {
      data.channel_id = model.id;
    }

    this.get('store').createRecord('subscription', data)
      .save()
      .then(() => {
        // FIXME: new channels if missing episodes
        if (this.__isURL(model.id)) {
          // FIXME: transition to channel
          window.location.reload();
        }
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
      this.get('store').find('subscription', this.get('model').id).then((subscription) => {
        subscription.destroyRecord();
        this.get('channel').set('subscribed', false);
      });
    }
  }
});
