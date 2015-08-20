import Ember from 'ember';

export default Ember.Mixin.create({
  model(query) {
    if (query.url) {
      return this.__request(query);
    } else {
      return { channels: [] };
    }
  },

  createChannelObject(_channel) {
    let channel = Ember.Object.create(_channel);
    channel.set('episodes',  channel.get('episodes').map((episode) => {
      return Ember.Object.create(episode);
    }));

    return channel;
  },

  filter(data) {
    return { channels: data };
  },

  __query(transition) {
    return { url: transition.queryParams.url };
  },

  __request(query) {
    return Ember.$.get(this.__resourceURL(), query).then((data) => {
      return this.filter(data.channels.map(this.createChannelObject), query);
    });
  },

  __resourceURL() {
    return this.__adapter().buildURL('parser');
  },

  __adapter() {
    return this.store.adapterFor('channel');
  }
});
