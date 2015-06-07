/* global $ */
import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, () => {
      $("#loading").fadeOut();
    });
  }
});
