import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function (transition) {
    var s = this._super(transition);

    if (!this.get('session.isAuthenticated')) {
      if(window.cordova) {
        this.transitionTo('users.subscriptions');
      } else {
        this.transitionTo('explore');
      }
    }
    return s;
  }
});
