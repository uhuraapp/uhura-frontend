import Ember from 'ember';

export default Ember.LinkComponent.extend({
  positionalParams: 'channel',
  layout: null,
  classNames: ['channel-link-card'],

  didReceiveAttrs() {
    this.attrs.params = ['channel', this.get('channel').id];
    this.attrs.hasBlock = true;
  }
});
