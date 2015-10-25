import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';
import TitledMixin from '../mixins/routes/titled';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject: { service }, computed: { alias } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, MaterialDesignMixin, TitledMixin,  {
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
        user['authenticator'] = 'authenticator:uhura';
        this.get('sessionStore').persist({authenticated: user});
      });
    }
  }
});
