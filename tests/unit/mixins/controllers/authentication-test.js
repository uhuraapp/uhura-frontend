import Ember from 'ember';
import ControllersAuthenticationMixin from '../../../mixins/controllers/authentication';
import { module, test } from 'qunit';

module('Unit | Mixin | controllers/authentication');

// Replace this with your real tests.
test('it works', function(assert) {
  let ControllersAuthenticationObject = Ember.Object.extend(ControllersAuthenticationMixin);
  let subject = ControllersAuthenticationObject.create();
  assert.ok(subject);
});
