/* global $ */
import Ember from 'ember';

export default Ember.View.extend({
  didInsertElement: function() {
    this._super();
    Ember.run.scheduleOnce('afterRender', this, () => {
      document.documentElement.classList.add('mdl-js');
      componentHandler.upgradeAllRegistered();
    });
  }
});
