import Ember from 'ember';

export default Ember.Service.extend({
  adapter() {
    return this.container.lookup('adapter:application');
  },

  request(modelName, id = '', action = '', type = 'GET', options = {}) {
    let url = this.buildURL(modelName, id, action);
    const removeTrailingSlash = (url) => url.replace(/\/$/, '');
    return this.adapter().ajax(removeTrailingSlash(url), type, options);
  },

  buildURL(modelName, id, action) {
    return `${this.adapter().buildURL(modelName, id)}/${action || ''}`;
  }
});
