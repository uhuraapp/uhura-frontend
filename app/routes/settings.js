import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';
import TitledMixin from '../mixins/routes/titled';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route, inject } = Ember;

export default Route.extend(AuthenticatedRouteMixin, MaterialDesignMixin, TitledMixin,  {
  client: inject.service('uhura-client'),
  notify: inject.service('notify'),

  actions: {
    save() {
      const name = this.get('controller.name');
      const locale = this.get('controller.locale') || 'en';
      const user = { name, locale };
      const data = { user };
      this.get('client').request('', 'user', '', 'PUT', { data }).then((user) => {
        this.get('notify').success('Profile updated!');
        this.container.lookup('session:main')._setup('authenticator:uhura', user, true);
      });
    }
  }
});
