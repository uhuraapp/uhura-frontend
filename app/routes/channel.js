/* global $ */
import Ember from 'ember';

export default Ember.Route.extend({
  activate: function () {
    var title = this.modelFor('channel').get('title');

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title);

    $.UIkit.offcanvas.hide(true);
  }
});
