import Ember from 'ember';
import ParserControllerMixin from '../mixins/parser-controller';

export default Ember.Route.extend(ParserControllerMixin, {
  setupController: function (controller, model) {
    if(!controller.url) {
      this.transitionTo('explore');
    }

    if(model.channels.length === 1) {
      this.transitionTo('channel_by_url', model.channels[0], {queryParams: controller});
    }

    this._super(controller, model);
  },
});
