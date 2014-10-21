App.ChannelCoverComponent = Ember.Component.extend({
  layoutName: "component/channel-cover",
  classNames: ["channel-cover column three-twelfth"],
  tagName: "li",
  actions: {
    subscribeChannel: function(_id) {
      try {
        var c = this.get('channel');
        if(c) c.set('subscribed', true);
      } catch (e) {
      }
      Subscriptions.subscribe.call(this, _id);
    },
    unsubscribeChannel:  function(_id){
      try {
        var c = this.get('channel');
        if(c) c.set('subscribed', false);
      } catch (e) {
      }

      Subscriptions.unsubscribe.call(this, _id);
    }
  }
});
