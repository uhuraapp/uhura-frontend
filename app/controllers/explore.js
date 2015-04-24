import Ember from 'ember';
import isURL from '../utils/is-url';

export default Ember.Controller.extend({
  queryParams: ['q'],
  q: null,
  results: [],
  searching: false,
  ready: false,

  categoriesFiltered: function () {
    var categories = this.get('model').toArray().map(function (category) {
      var channels = category.get('channels').toArray()
      category.channels = channels.splice(0, 5);
      return category;
    });
    return categories;
  }.property('model.length'),

  queryChanges: function () {
    if(!this.q || this.q === ""){
      this.set('results', []);
      return;
    }

    this.set('query', this.q);

    var results = this.lunr.search(this.q).map(function(c){ return c.ref; });
    this.store.filter('channel', function(channel) {
      return results.indexOf(channel.id) > -1;
    }).then((channels) => {
      this.set('results', channels.toArray());
    });

  }.observes('q', 'ready'),

  actions: {
    search: function () {
      isURL(this.query) ? this.transitionToRoute('channel_by_url', {url: this.q}) : this.set('q', this.query);
    }
  }
});
