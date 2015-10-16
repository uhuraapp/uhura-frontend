import Ember from 'ember';

const { isBlank, inject: { service } } = Ember;

const EMAIL_REGEX = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");

const isValidEmail = (email) => {
  return EMAIL_REGEX.exec(email) !== null;
};

export default Ember.Mixin.create({
  processing: false,
  processingMessage: '',

  session: service('session'),
  uhura: service('uhura-client'),

  register() {
    this.set('processing', true);
    this.set('errorMessage', false);

    let email    = this.get('email');
    let password = this.get('password');
    let name     = this.get('name');

    if (isBlank(email) || isBlank(password) || isBlank(name)) {
      this.set('errorMessage', 'Email, Password and Name field is required');
      return;
    }

    if (!isValidEmail(email)) {
      this.set('errorMessage', 'Please fill Email field with a valid email address');
      return;
    }

    if (password.length < 6) {
      this.set('errorMessage', 'Password too short: Minimum amount of characters 6');
      return;
    }

    const user = { email, password, name };
    const data = { user };
    const xhrFields = { withCredentials: true };

    const always = () => {
      this.set('loading', false);
      this.set('processing', false);
      this.set('processingMessage', '');
      this.set('password', '');
    };

    const authenticator = this.container.lookup('authenticator:uhura');

    this.get('uhura')
        .request('users', null, null, 'POST', { data, xhrFields })
        .then(() => {
          return new Ember.RSVP.Promise(authenticator.checkCredentials.bind(authenticator));
        }).then((data) => {
          this.container.lookup('session:main')._setup('authenticator:uhura', data, true);
        }).catch((errorStatus) => {
          this.set('errorMessage', errorStatus.errors.map(error => error.message).join('\n'));
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
