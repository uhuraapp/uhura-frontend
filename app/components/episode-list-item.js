/* global $ */
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: "li",
  classNames: ["episode"],
  actions: {
    info: function() {
      var t = $(event.target);
      t.toggleClass('active');
      t.parents('li').find('.description').toggleClass('uk-hidden');
    }
  }
});
