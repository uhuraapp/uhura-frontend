import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['subscribe-button'],
  actions: {
    subscribe: function() {
      var model = this.get('channel');
      if(this.get('byURL')) {
        // TODO: subscribe by URL
      } else {
        this.get('targetObject.store').createRecord('subscription', {
          channel_id: model.id
        }).save().then(function(){
          model.set('subscribed', true);
        });
      }
    },
    unsubscribe: function() {
      var model = this.get('channel');
      this.get('targetObject.store').find('subscription', model.id).then(function(subscription){
        subscription.destroyRecord();
        model.set('subscribed', false);
      });
    }
  }
});
