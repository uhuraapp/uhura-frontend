/* globals Slideout */
import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions : {
    authenticate: function (provider) {
      this.set('loading', true);
      this.set('loginError', false);
      this.get('session')
        .authenticate('authenticator:uhura', provider)
        .then(() => {
          //_this.container.lookup('route:application').refresh();
          this.set('loading', false);
        }, () => {
          this.set('loginError', true);
        });
    },
    createMenu: function () {
      if(this.get('session.isAuthenticated')) {
        this.slideout = new Slideout({
          'panel': document.getElementById('content'),
          'menu': document.getElementById('menu'),
          'padding': 280,
          'tolerance': 70
        });
      }
    },
    toggleMenu: function () {
      if(this.slideout) {  this.slideout.toggle(); }
    },
    closeMenu: function () {
      if(this.slideout) {  this.slideout.close(); }
    },
  }
});
