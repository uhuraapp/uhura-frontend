import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';

export default Ember.Route.extend(MaterialDesignMixin, {
  model(params) {
    return this.store.find('channel', params.channel_id);
  }
});
