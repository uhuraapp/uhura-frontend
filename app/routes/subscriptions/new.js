import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      categories: this.store.findAll('category')
        .then((data) => data.sortBy('channelsLength'))
        .then((data) => data.reverse())
    });
  }
});
