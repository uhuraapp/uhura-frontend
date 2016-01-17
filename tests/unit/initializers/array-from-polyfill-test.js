import Ember from 'ember';
import ArrayFromPolyfillInitializer from '../../../initializers/array-from-polyfill';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | array from polyfill', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  ArrayFromPolyfillInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
