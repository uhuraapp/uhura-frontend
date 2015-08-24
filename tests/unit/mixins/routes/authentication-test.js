import Ember from 'ember';
import RoutesAuthenticationMixin from '../../../mixins/routes/authentication';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/authentication');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesAuthenticationObject = Ember.Object.extend(RoutesAuthenticationMixin);
  let subject = RoutesAuthenticationObject.create();
  assert.ok(subject);
});
