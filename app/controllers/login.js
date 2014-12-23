import Ember from 'ember';

export default Ember.Controller.extend({
  authenticator: 'authenticator:uhura',
  actions: {
    authenticate: function (provider) {
      this.get('session').authenticate('authenticator:uhura', provider);
    }
  }
});
