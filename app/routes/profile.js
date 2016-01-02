import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';

export default Ember.Route.extend(MaterialDesignMixin, {
  model(options) {
    return this.store.find('profile', options.profile_id);
  }
});
