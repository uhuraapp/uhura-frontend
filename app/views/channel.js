import Ember from 'ember';

export default Ember.View.extend({
  modelDidChanged: function () {
    this.container.lookup('controller:application').send('closeMenu');
  }.observes('controller.model').on('didInsertElement')
});
