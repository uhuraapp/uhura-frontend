import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  name: Ember.computed.alias('session.session.content.name'),
  locale: Ember.computed.alias('session.session.content.locale'),

  locales: ["", "PT", "EN"],

  init() {
    this._super();
    this.send('setTitle', 'Settings');
  }
});
