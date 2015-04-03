/* globals Slideout */
import Ember from 'ember';

export default Ember.ArrayController.extend({
  actions : {
    createMenu: function () {
      this.slideout = new Slideout({
        'panel': document.getElementById('content'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
      });
    },
    toggleMenu: function () {
      this.slideout.toggle();
    },
    closeMenu: function () {
      if(this.slideout) {  this.slideout.close(); }
    }
  }
});
