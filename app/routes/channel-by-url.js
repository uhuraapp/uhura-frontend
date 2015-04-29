import Ember from 'ember';

export default Ember.Route.extend({
  model: function (_, transition) {
    var data = { url: transition.queryParams.url };
    if(data.url) {
      return this.__request(data);
    } else {
      return {};
    }
  },
  setupController: function (controller, model) {
    if(!controller.url) {
      this.transitionTo('explore');
    }

    if(model.uhura_id && model.uhura_id != "") {
      this.replaceWith('channel', model.uhura_id);
      return
    }
    this._super(controller, model);
  },
  __adapter: function () {
    return this.store.adapterFor('channel');
  },
  __resourceURL: function () {
    return this.__adapter().buildURL('parser');
  },
  __request: function (data) {
    return Ember.$.get(this.__resourceURL(), data).then(function (data) {
      var channel = Ember.Object.create(data.channel);
      channel.set('episodes',  channel.get('episodes').map(function (episode) {
        return Ember.Object.create(episode);
      }));
      return channel;
    });
  }
});
