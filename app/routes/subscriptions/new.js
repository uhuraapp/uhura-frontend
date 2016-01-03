import Ember from 'ember';

const { RSVP: { hash }, Route, inject: { service } } = Ember;

export default Route.extend({
  client: service('uhura-client'),

  model() {
    return hash({
      categories: this.store.findAll('category')
        .then((data) => data.sortBy('channelsLength'))
        .then((data) => data.reverse()),
    });
  }
});
