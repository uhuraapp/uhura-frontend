import Ember from 'ember';

export default Ember.Mixin.create({
  setupController(a, b) {
    Ember.run.scheduleOnce('afterRender', this, 'upgradeElements');
    this._super(a, b);
  },
  upgradeElements() {
    let elements = document.querySelectorAll('.page-content [class^=mdl]');
    [].forEach.call(elements, el => window.componentHandler.upgradeElement(el));
  }
});
