import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    this.store.find('category').then((data) => {
      controller.set('categories', data);
    });
  }
});
