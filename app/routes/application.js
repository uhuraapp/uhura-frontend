/* global $ */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  model: function(){
    'use strict';
    var _this = this;
    return new Ember.RSVP.Promise( function (resolve) {
      _this.store.find('users/subscription').then(resolve, function(){
        resolve([]);
      });
    });
  },
  activate: function(){
    var title = "Dashboard - Uhura App";

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  }
});
