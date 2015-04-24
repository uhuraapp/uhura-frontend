import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return new Ember.RSVP.Promise((resolve) => {
      resolve(this.store.all('category'));
      this.store.fetchAll('category')
        .then((categories) => { this.__index(categories.toArray()); });
    });
  },
  __index: function (categories) {
    for (var i = 0, l = categories.length; i < l; i ++) {
      var category = categories[i].get('_data');
      for (var j = 0, h = category.channels.length; j < h; j ++) {
        var channel = category.channels[j].get('_data');
        this.lunr.add(channel);
        this.store.push('channel', channel);
      }
      this.store.push('category', category);
    }
    this.lunr.index();
  }
});
