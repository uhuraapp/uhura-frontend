import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['share'],

  setTitle: Ember.observer('model', function () {
    this.send('setTitle', this.get('model.title'));
  })
});
