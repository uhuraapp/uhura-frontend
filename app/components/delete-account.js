import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['delete-account-modal', 'mdl-card', 'mdl-shadow--2dp'],
  actions: {
    deleteAccount() {
      this.sendAction('deleteAccount');
      this.sendAction('dismiss');
    }
  }
});
