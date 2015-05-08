import Ember from 'ember';

export default Ember.View.extend({
  __closeMenu: function () {
    this.container.lookup('controller:application').send('closeMenu');
  }.on('didInsertElement')
});
