import Ember from 'ember';

export default Ember.ArrayController.extend({
  loginChange: function () {
    Ember.run.scheduleOnce('afterRender', () => {
      this.send('createMenu');
    });
  }.observes('session.isAuthenticated'),

  actions : {
    authenticate: function (provider) {
      this.set('loading', true);
      this.set('loginError', false);
      this.get('session')
        .authenticate('authenticator:uhura', provider)
        .then(() => {
          this.container.lookup('route:application').refresh();
          this.set('loading', false);
        }, () => {
          this.set('loginError', true);
        });
    }
  }
});
