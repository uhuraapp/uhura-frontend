import Ember from 'ember';
import AuthenticationMixin from '../mixins/controllers/authentication';

export default Ember.Controller.extend(AuthenticationMixin, {
  actions: {
    authenticate(provider) {
      this.authenticate(provider);
    }
  }
});
