import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, model) {
    this._super(controller, model);

    var title = model.get('title');

    Ember.$("meta[name='description']").attr('value', model.get('description'));
    Ember.$("[property='og:image']").attr('content', model.get('image_url'));
    Ember.$("[property='og:title']").attr('content', title);
    Ember.$(document).attr('title', title);
    Ember.$.UIkit.offcanvas.hide(true);
  }
});
