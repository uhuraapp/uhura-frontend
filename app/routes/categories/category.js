import Ember from 'ember';

export default Ember.Route.extend({
  model({ id }) {
    return this.store.find('category', id);
  }
});
