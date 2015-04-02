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
      this.get('controller').send('createMenu');
    });
  }
});
