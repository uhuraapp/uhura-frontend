import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

const { Evented } = Ember;

const session = Ember.Object.extend(Evented, {
  content: {}
}).create();

const sessionService = Ember.Object.extend(Evented);

moduleFor('route:application', {
  beforeEach() {
    const { container } = this;
    const service = sessionService.create({ container, session });
    this.registry.register('service:session', service, { instantiate: false });
  }
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
