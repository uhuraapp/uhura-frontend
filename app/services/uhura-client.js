import Ember from 'ember';

export default Ember.Service.extend({
  adapter() {
    return this.container.lookup('adapter:application');
  },

  request(modelName, id, action, type, options) {
    let url = `${this.adapter().buildURL(modelName, id)}/${action}`;
    return this.adapter().ajax(url, type, options);
  }
});
