import Ember from 'ember';
import ParserController from '../mixins/parser-controller';

export default Ember.Route.extend(ParserController, {
  setupController(controller, model) {
    if (!controller.url) {
      this.transitionTo('explore');
    }

    if (model.uhura_id && model.uhura_id !== '') {
      this.replaceWith('channel', model.uhura_id);
      return;
    }

    this._super(controller, model);
  },

  filter(channels, query) {
    return channels.filterBy('id', query.channel_id)[0];
  }
});
