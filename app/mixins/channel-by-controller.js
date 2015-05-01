import Ember from 'ember';

export default Ember.Mixin.create({
  model: function (_, transition) {
    let query = this.__query(transition);
    if(query.url) {
      return this.__request(query);
    } else {
      return {channels: []};
    }
  },

  createChannelObject: function (_channel) {
    var channel = Ember.Object.create(_channel);
    channel.set('episodes',  channel.get('episodes').map(function (episode) {
      return Ember.Object.create(episode);
    }));

    return channel;
  },

  __query: function(transition) {
      return { url: transition.queryParams.url };
  },

  __request: function (query) {
    return Ember.$.get(this.__resourceURL(), query).then((data) => {
      return this.process(data);
    });
  },

  __resourceURL: function () {
    return this.__adapter().buildURL('parser');
  },

  __adapter: function () {
    return this.store.adapterFor('channel');
  },
});
