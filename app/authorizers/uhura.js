import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default Base.extend({
  authorize(user, block) {
    if (user && user.token && !isEmpty(user.token)) {
      block('Authorization', `Token ${user.token}`);
    }
  }
});
