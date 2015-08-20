import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('category');
  },
  afterModel(model) {
    this.__index(model.toArray());
  },
  __index(categories) {
    categories.forEach((_category) => {
      let category = _category.get('_data');
      category.channels.forEach((channel) => {
        this.lunr.add(channel.get('_data'));
      });
    });
    this.lunr.index();
  }
});
