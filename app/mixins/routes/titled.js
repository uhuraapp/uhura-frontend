import Ember from 'ember';

const { computed, run } = Ember;

export default Ember.Mixin.create({
  setupController(a, b) {
    this._super(a, b);
    run.scheduleOnce('afterRender', this, 'setPageTitle');
  },

  shouldSetTitle: computed(() => true),

  setPageTitle() {
    let title = '';
    if (this.get('shouldSetTitle')) {
      title = this.get('controller.title') || this.get('controller.model.title');
    }

    this.send('setTitle', title);
  }
});
