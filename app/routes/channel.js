import Ember from 'ember';
import MaterialDesignMixin from '../mixins/routes/material-design';

const { service } = Ember.inject;

export default Ember.Route.extend(MaterialDesignMixin, {
  session: service('session'),
  beforeModel(transition) {
    this.get('session').set('attemptedTransition', transition);
    return this._super(transition);
  },
  model(params) {
    return this.store.find('channel', params.channel_id);
  }
});
