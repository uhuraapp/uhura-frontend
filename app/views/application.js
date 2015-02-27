/* global $*/
import Ember from 'ember';
import fixSidebarHeight from '../utils/fix-sidebar-height';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      $("#loading").fadeOut();
      fixSidebarHeight()
      $(window).on('resize', fixSidebarHeight);
    });
  }
});
