import Ember from 'ember';
import RoutesMaterialDesignMixin from '../../../../mixins/routes/material-design';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/material design');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesMaterialDesignObject = Ember.Object.extend(RoutesMaterialDesignMixin);
  let subject = RoutesMaterialDesignObject.create();
  assert.ok(subject);
});
