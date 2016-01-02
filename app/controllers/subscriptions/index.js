import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Controller.extend({
  accountService: service('session-account'),
  account: computed.alias('accountService.account'),
  shareURL: computed('account.id', function() {
    const url = window.location.origin;
    return `${url}/profiles/${this.get('account.id')}`;
  })
});
