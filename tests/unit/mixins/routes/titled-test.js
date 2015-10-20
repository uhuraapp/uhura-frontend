import Ember from 'ember';
import RoutesTitledMixin from '../../../../mixins/routes/titled';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/titled');

// Replace this with your real tests.
test('it works', function(assert) {
  const RoutesTitledObject = Ember.Object.extend(RoutesTitledMixin);
  const subject = RoutesTitledObject.create();
  assert.ok(subject);
});
