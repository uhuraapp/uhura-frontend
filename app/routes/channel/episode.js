import Ember from 'ember';

const { $ } = Ember;

export default Ember.Route.extend({
  setupController(controller, model) {
    this._super(controller, model);
    Ember.run.scheduleOnce('afterRender', this, 'prepareToCloseModal');
  },

  prepareToCloseModal() {
    $('#episode-modal').on('click', (e) => {
      if ($(e.target).is('#episode-modal')) {
        const channelID = this.get('controller.model.channel_id');
        this.transitionTo('channel', channelID);
      }
    });
  }
});
