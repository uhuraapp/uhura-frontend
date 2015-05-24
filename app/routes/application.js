/* global $ */
import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel() {
    this._super();
    $("#loading").show();
  },
  activate: function(){
    var title = "Dashboard - Uhura App";

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);
  }
});
