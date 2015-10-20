import Ember from 'ember';

export default Ember.Mixin.create({
  setupController(a, b) {
    this._super(a, b);
    Ember.run.scheduleOnce('afterRender', this, 'setPageTitle');
  },

  setPageTitle() {
    const title = this.get('controller.title') || this.get('controller.model.title');
    this.send('setTitle', title);
  }
});
