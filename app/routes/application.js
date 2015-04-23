/* global $ */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  init: function () {
    this._super();

    this.emberSync.set('offlineStore', this.store);
    this.emberSync.set('onlineStore',  this.onlineStore);
    this.emberSync.synchronizeOnline();
  },
  model: function(){
    'use strict';
    if(this.get('session.isAuthenticated')) {
      return this.emberSync.find('subscription');
    } else {
      return [];
    }
  },
  activate: function(){
    var title = "Dashboard - Uhura App";

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  }
});
