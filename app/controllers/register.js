import Ember from 'ember';
import AuthenticationMixin from '../mixins/controllers/authentication';

export default Ember.Controller.extend(AuthenticationMixin, {
  actions: {
    register() {
      this.register();
    },
    authenticate(provider) {
      this.authenticate(provider);
    }
  }
});
