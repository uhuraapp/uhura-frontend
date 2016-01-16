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
    this._processsingState();

    let email    = this.get('email');
    let password = this.get('password');
    let name     = this.get('name');

    const [error, errorMessage] = this._makeInputValidation(email, password, name);

    if (error) {
      return this._errorState(errorMessage);
    }

    const user = { email, password, name };
    const data = { user };
    const xhrFields = { withCredentials: true };

    const authenticator = this.container.lookup('authenticator:uhura');

    this.get('uhura')
    .request('users', null, null, 'POST', { data, xhrFields })
    .then(() => {
      return new Ember.RSVP.Promise(authenticator.checkCredentials.bind(authenticator));
    }).then((data) => {
      this.container.lookup('session:main')._setup('authenticator:uhura', data, true);
    }).catch((errorStatus) => {
      this._errorState(errorStatus.errors.map(error => error.message).join('\n'));
    }).then(this._processedState.bind(this), this._processedState.bind(this));
  },

  authenticate(provider) {
    this._processsingState();

    let email    = this.get('email');
    let password = this.get('password');
    let data     = { email, password, provider };

    if (provider) {
      this.set('processingMessage', `${provider} authorization`);
    }

    this.get('session')
    .authenticate('authenticator:uhura', data)
    .catch((errorMessage) => {
      this.set('errorMessage', errorMessage);
    }).then(this._processedState.bind(this), this._processedState.bind(this));
  },

  _makeInputValidation(email, password, name) {
    if (isBlank(email) || isBlank(password) || isBlank(name)) {
      return [true,  'Email, Password and Name field is required'];
    }

    if (!isValidEmail(email)) {
      return [true, 'Please fill Email field with a valid email address'];
    }

    if (password.length < 6) {
      return [true, 'Password too short: Minimum amount of characters 6'];
    }

    return [false, ''];
  },

  _processsingState() {
    this.set('processing', true);
    this.set('errorMessage', false);
  },

  _processedState() {
    this.set('loading', false);
    this.set('processing', false);
    this.set('processingMessage', '');
    this.set('password', '');
  },

  _errorState(message) {
    this.set('errorMessage', message);
  }
});
