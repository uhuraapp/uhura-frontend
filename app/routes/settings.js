import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, computed: { alias } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, MaterialDesignMixin, {
  client: service('uhura-client'),
  notify: service('notify'),
  session: service('session'),
  sessionStore: alias('session.store'),

  actions: {
    save() {
      const name = this.get('controller.name');
      const optin = this.get('controller.optin');
      const locale = this.get('controller.locale') || 'en';
      const user = { name, locale, optin };
      const data = { user };
      this.get('client').request('', 'user', '', 'PUT', { data }).then((user) => {
        this.get('notify').success('Profile updated!');
        user.authenticator = 'authenticator:uhura';
        this.get('sessionStore').persist({ authenticated: user });
      });
    },

    deleteAccount() {
      this.get('client').request('', 'user', '', 'DELETE').then(() => {
        this.get('notify').success('Account deleted!');
        this.get('session').invalidate();
      });
    }
  }
});
