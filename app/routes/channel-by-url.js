import Ember from 'ember';

export default Ember.Route.extend({
  model: function (data) {
    var resourceURL = this.__adapter().buildURL('parser');
    return $.get(resourceURL + "/" + data.url);
  },
  __adapter: function() {
    return this.onlineStore.adapterFor('channel');
  }
});
