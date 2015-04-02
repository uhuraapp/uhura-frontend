/* global $, Slideout */
import Ember from 'ember';
import fixSidebarHeight from '../utils/fix-sidebar-height';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, () => {
      $("#loading").fadeOut();
      fixSidebarHeight();
      $(window).on('resize', fixSidebarHeight);

      this.slideout = new Slideout({
        'panel': document.getElementById('content'),
        'menu': document.getElementById('menu'),
        'padding': 256,
        'tolerance': 70
      });
    });
  },
  actions: {
    toggleMenu: function () {
      this.slideout.toggle();
    }
  }
});
