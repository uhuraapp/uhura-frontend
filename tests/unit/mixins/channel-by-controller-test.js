import Ember from 'ember';
import ChannelByControllerMixin from '../../../mixins/channel-by-controller';
import { module, test } from 'qunit';

module('ChannelByControllerMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var ChannelByControllerObject = Ember.Object.extend(ChannelByControllerMixin);
  var subject = ChannelByControllerObject.create();
  assert.ok(subject);
});
