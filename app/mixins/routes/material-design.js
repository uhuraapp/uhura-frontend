import Ember from 'ember';

export default Ember.Mixin.create({
  setupController(a, b) {
    Ember.run.scheduleOnce('afterRender', this, 'upgradeElements');
    this._super(a, b);
  },
  upgradeElements() {
    window.componentHandler.upgradeDom('MaterialButton');
    window.componentHandler.upgradeDom('MaterialLayout');
  }
});
