/* globals Slideout */
import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions : {
    createMenu: function () {
      if(this.get('session.isAuthenticated')) {
        this.slideout = new Slideout({
          'panel': document.getElementById('content'),
          'menu': document.getElementById('menu'),
          'padding': 256,
          'tolerance': 70
        });
      }
    }
  },
  toggleMenu: function () {
    if(this.slideout) {  this.slideout.toggle(); }
  },
  closeMenu: function () {
    if(this.slideout) {  this.slideout.close(); }
  }
});
