import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.find('category');
  },
  afterModel: function (model) {
    this.__index(model.toArray());
  },
  __index: function (categories) {
    categories.forEach( (_category) => {
      var category = _category.get('_data');
      category.channels.forEach( (channel) => {
        this.lunr.add(channel.get('_data'));
      });
    });
    this.lunr.index();
  }
});
