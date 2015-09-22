import Ember from 'ember';

const { isBlank, inject: { service } } = Ember.inject;

export default Ember.Mixin.create({
  processing: false,
  processingMessage: '',

  session: service('session'),

  register() {
    this.set('processing', true);
    this.set('errorMessage', false);

    let email    = this.get('email');
    let password = this.get('password');
    let name     = this.get('name');

    if(isBlank(email) || isBlank(password) || isBlank(name)) {
      this.set('errorMessage', "all field is obrigatory");
      return
    }
    debugger;
    console.log(email, password, name)
  },

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
});
