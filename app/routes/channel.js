/* global $ */
import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    $("#profile").fadeOut();
  },
  model: function (params) {
    return this.store.find('channel', params.channel_id);
  },
  setupController: function (controller, model) {
    if(model.get('episodes').length === 0){
      model.reload();
    }

    this._super(controller, model);

    var title = model.get('title');

    Ember.$("meta[name='description']").attr('value', model.get('description'));
    Ember.$("[property='og:image']").attr('content', model.get('image_url'));
    Ember.$("[property='og:title']").attr('content', title);
    Ember.$(document).attr('title', title);
  }
});
