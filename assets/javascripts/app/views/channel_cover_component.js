App.ChannelCoverComponent = Ember.Component.extend({
  layoutName: "component/channel-cover",
  classNames: ["channel-cover column three-twelfth"],
  tagName: "li",
  actions: {
    subscribeChannel: function(_id) {
      this.get('channel').set('subscribed', true);
      Subscriptions.subscribe.call(this, _id);
    },
    unsubscribeChannel:  function(_id){
      this.get('channel').set('subscribed', false);
      Subscriptions.unsubscribe.call(this, _id);
    }
  }
});
