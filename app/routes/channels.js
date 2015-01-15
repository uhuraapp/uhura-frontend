import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    this.store.find('category').then(function(data){
      controller.set('categories', data);
    });
  }
});
