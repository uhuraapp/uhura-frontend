import Ember from 'ember';
import MaterialDesignMixin from './material-design';

export default Ember.Mixin.create(MaterialDesignMixin, {
  session: Ember.inject.service('session'),
  beforeModel(transition) {
    if (this.get('session').get('isAuthenticated')) {
      transition.abort();
      this.transitionTo('index');
    }
    return this._super(transition);
  }
});
