import Ember from 'ember';

export default Ember.Route.extend({
  setupController(a,b){
    this._super(a,b);
    Ember.run.scheduleOnce('afterRender', this, 'prepareToClose');
  },

  prepareToClose() {
    Ember.$('#episode-modal').on('click', (e) => {
      if(Ember.$(e.target).is('#episode-modal')) {
        const channelID = this.get('controller.model.channel_id');
        this.transitionTo('channel', channelID);
      }
    });
  }
});
