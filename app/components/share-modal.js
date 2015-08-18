import Ember from 'ember';

export default Ember.Component.extend({
  currentURL: Ember.computed(() => {
    return window.location.toString().split('?')[0];
  })
});
