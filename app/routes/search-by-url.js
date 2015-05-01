import Ember from 'ember';
import ChannelByControllerMixin from '../mixins/channel-by-controller';

export default Ember.Route.extend(ChannelByControllerMixin, {
  setupController: function (controller, model) {
    if(!controller.url) {
      this.transitionTo('explore');
    }

    if(model.length === 1) {
      // this.transitionTo('channel_by_url', controller.url);
    }

    this._super(controller, model);
  },

  process: function (data) {
    return {channels: data.channels.map(this.createChannelObject)};
  }
});
