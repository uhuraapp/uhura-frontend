import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';

export default Ember.Route.extend(MaterialDesignMixin, {
  client: Ember.inject.service('uhura-client'),
  actions: {
    save() {
      const name = this.get('controller.name');
      const locale = this.get('controller.locale') || 'en';
      const user = { name, locale };
      const data = { user };
      this.get('client').request('', 'user', '', 'PUT', { data }).then((user) => {
        this.container.lookup('session:main')._setup('authenticator:uhura', user, true);
      });
    }
  }
});
