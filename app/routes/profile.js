import Ember from 'ember';
import TitledMixin from '../mixins/routes/titled';
import MaterialDesignMixin from '../mixins/routes/material-design';

export default Ember.Route.extend(TitledMixin, MaterialDesignMixin, {
  model(options) {
    return this.store.find('profile', options.profile_id);
  }
});

