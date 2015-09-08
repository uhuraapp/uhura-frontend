import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter', {
  // needs: ['serializer:foo']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});

test('it has v2 namespace', function(assert) {
  assert.equal(this.subject().namespace, 'v2');
});

test('it has host', function(assert) {
  assert.equal(this.subject().host, 'https://api.uhura.io');
});

test('pathForType fix users path', function(assert) {
  let path = v => this.subject().pathForType(v);
  assert.equal(path('test'),         'tests');
  assert.equal(path('subscription'), 'users/subscriptions');
});
