import Ember from 'ember';

export default Ember.Controller.extend({
  processing: false,
  processingMessage: '',

  session: Ember.inject.service('session'),

  actions: {
    authenticate(provider) {
      this.set('processing', true);
      this.set('errorMessage', false);

      let email    = this.get('email');
      let password = this.get('password');
      let data     = { email, password, provider };

      if (provider) {
        this.set('processingMessage', `${provider} authorization`);
      }

      this.get('session')
        .authenticate('authenticator:uhura', data)
        .then(() => {
          this.set('loading', false);
          this.set('processing', false);
          this.set('processingMessage', '');
        }).catch((errorMessage) => {
          this.set('errorMessage', errorMessage);
          this.set('processing', false);
          this.set('processingMessage', '');
        });
    }
  }
});
