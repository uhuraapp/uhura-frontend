import Ember from 'ember';
import MaterialDesignMixin from './material-design';

export default Ember.Mixin.create(MaterialDesignMixin, {
  beforeModel(transition) {
    if (this.get('session.isAuthenticated')) {
      transition.abort();
      this.transitionTo('index');
    }
    return this._super(transition);
  }
});
