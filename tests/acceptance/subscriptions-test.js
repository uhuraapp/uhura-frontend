import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';
import {
  // currentSession,
  authenticateSession,
  // invalidateSession
} from 'uhuraapp/tests/helpers/ember-simple-auth';

module('Acceptance | subscriptions', {
  // jscs:disable requireEnhancedObjectLiterals
  beforeEach: function() {
    this.application = startApp();
  },

  // jscs:disable requireEnhancedObjectLiterals
  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /subscriptions', function(assert) {
  server.createList('subscription', 5);

  authenticateSession(this.application);

  visit('/subscriptions');

  andThen(function() {
    assert.equal(currentURL(), '/subscriptions');
    assert.equal(find('#subscriptions > a').length, 5);
  });
});
