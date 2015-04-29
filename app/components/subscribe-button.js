import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['subscribe-button'],
  actions: {
    subscribe: function() {
      var model = this.get('channel');

      this.get('targetObject.store').createRecord('subscription', {
        channel_id: model.id,
        channel_url: model.links && model.links[0]
      }).save().then(function(){
        model.set('subscribed', true);
      });
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
