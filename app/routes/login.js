import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    let s = this._super(transition);

    if (this.get('session.isAuthenticated')) {
      transition.abort();
      this.transitionTo('index');
    }

    return s;
  }
});
