import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return new Ember.RSVP.Promise((resolve) => {
      this.emberSync.find('category').then((categories) => {
        this.__indexChannels(categories);
        resolve(categories);
      });
    });
  },
  __indexChannels: function (__categories) {
    var categories = __categories.toArray();
    for (var i = 0, l = categories.length; i < l; i ++) {
      var category = categories[i].get('_data');
      for (var j = 0, l1 = category.channels.length; j < l1; j ++) {
        var channel = category.channels[j].get('_data');
        this.lunr.add(channel);
      }
    }
    this.lunr.index();
  }
});
