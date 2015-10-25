import Ember from 'ember';

const { computed: { alias, bool }, inject } = Ember;

export default Ember.Controller.extend({
  session: inject.service(),
  name:    alias('session.data.authenticated.name'),
  optin:   bool('session.data.authenticated.optin'),
  locale:  alias('session.data.authenticated.locale'),

  locales: ['', 'PT', 'EN'],

  title: 'Settings',

  whenOptinWasChanged: Ember.observer('optin', function() {
    this.send('save');
  })
});
