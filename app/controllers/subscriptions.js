import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this.send('setTitle', 'Subscriptions');
    this._super();
  }
});
