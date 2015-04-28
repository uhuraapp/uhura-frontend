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
    this._super(controller, model);
  },
  __adapter: function () {
    return this.store.adapterFor('channel');
  },
  __resourceURL: function () {
    return this.__adapter().buildURL('parser');
  },
  __request: function (data) {
    return Ember.$.get(this.__resourceURL(), data);
  }
});
