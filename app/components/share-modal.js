import Ember from 'ember';

export default Ember.Component.extend({
  currentURL: Ember.computed(() => {
    return `${window.location.toString().split('?')[0]}?utm_source=uhura+modal&utm_medium=site`;
  }),

  actions: {
    close() {
      this.sendAction(this.attrs.dismiss);
    }
  }
});
