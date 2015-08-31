import Ember from 'ember';

export default Ember.Mixin.create({
  setupController(a, b) {
    this._super(a, b);
    Ember.run.scheduleOnce('afterRender', this, 'upgradeElements');
  },
  upgradeElements() {
    window.componentHandler.upgradeDom('MaterialButton');
    window.componentHandler.upgradeDom('MaterialLayout');
  }
});
