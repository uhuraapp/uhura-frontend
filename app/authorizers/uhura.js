import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default Base.extend({
  session: Ember.inject.service('session'),
  authorize(block) {
    const token = this.get('session.authenticated.token');
    if (this.get('session.isAuthenticated') && !isEmpty(token)) {
      block('Authorization', `Token ${token}`);
    }
  }
});
