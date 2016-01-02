import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Component.extend({
  session: service(),
  classNames: ['mdl-layout', 'mdl-js-layout', 'unlogged'],
  actions: {
    invalidateSession() {
      this.sendAction('invalidateSession');
      return false;
    }
  }
});
