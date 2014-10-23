/* global $ */
import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    'use strict';

    return this.store.find('subscription');
  },
  activate: function(){
    var title = "Dashboard - Uhura App";

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  }
});
