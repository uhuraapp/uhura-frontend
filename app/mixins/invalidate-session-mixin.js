import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    invalidateSession() {
      this.sendAction('invalidateSession');
      return false;
    }
  }
});
