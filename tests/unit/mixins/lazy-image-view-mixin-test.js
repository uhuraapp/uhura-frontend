import Ember from 'ember';
import LazyImageViewMixinMixin from '../../../mixins/lazy-image-view-mixin';
import { module, test } from 'qunit';

module('LazyImageViewMixinMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var LazyImageViewMixinObject = Ember.Object.extend(LazyImageViewMixinMixin);
  var subject = LazyImageViewMixinObject.create();
  assert.ok(subject);
});
