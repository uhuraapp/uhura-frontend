import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions : {
    authenticate: function (provider) {
      this.set('loading', true);
      this.set('loginError', false);
      this.get('session')
        .authenticate('authenticator:uhura', provider)
        .then(() => {
          this.set('loading', false);
        }, () => {
          this.set('loginError', true);
        });
    }
  }
});
