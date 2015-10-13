import Ember from 'ember';

const { isBlank, inject: { service } } = Ember;

export default Ember.Mixin.create({
  processing: false,
  processingMessage: '',

  session: service('session'),
  uhura: service('uhura-client'),

  register() {
    const flashMessages = Ember.get(this, 'flashMessages');

    this.set('processing', true);
    this.set('errorMessage', false);

    let email    = this.get('email');
    let password = this.get('password');
    let name     = this.get('name');

    if (isBlank(email) || isBlank(password) || isBlank(name)) {
      this.set('errorMessage', 'Please fill the required fields');
      return;
    }

    const user = { email, password, name }
    const data = { user }

    const always = () => {
      this.set('loading', false);
      this.set('processing', false);
      this.set('processingMessage', '');
      this.set('password', '');
    }

    this.get('uhura')
      .request('users', null, null, 'POST', { data })
      .then(() => {
        flashMessages.success("success!!!!");
      })
      .catch((errorMessage) => {
        this.set('errorMessage', "Errrooorrr");
      }).then(always, always);
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
