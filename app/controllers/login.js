import Ember from 'ember';

export default Ember.Controller.extend({
  actions : {
    authenticate: function (provider) {
      let email    = this.get('email');
      let password = this.get('password');
      var data = {email, password, provider};

      this.set('errorMessage', false);

      this.get('session')
        .authenticate('authenticator:uhura', data)
        .then(() => {
          this.set('loading', false);
        }).catch((errorMessage) => {
          this.set('errorMessage', "Could not authenticate");
        });
    }
  }
});
