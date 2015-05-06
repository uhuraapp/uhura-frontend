import Ember from 'ember';
import Login from '../services/login';

export default Ember.Component.extend({
  classNames: ['subscribe-button'],
  __store: function () {
    return this.container.lookup("store:main");
  },
  makeSubscription: function () {
    var model = this.get('channel');
    this.__store().createRecord('subscription', {
      channel_id: model.id,
      channel_url: model.links && model.links[0]
    }).save().then(function(){
      model.set('subscribed', true);
    });
  },
  actions: {
    subscribe: function() {
      if(this.get('session.isAuthenticated')) {
        this.makeSubscription();
      } else {
        var login = new Login(this.container, true);
        login.start(() => { this.makeSubscription(); });
      }
    },
    unsubscribe: function() {
      var model = this.get('channel');
      this.__store().find('subscription', model.id).then(function(subscription){
        subscription.destroyRecord();
        model.set('subscribed', false);
      });
    }
  }
});
