import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter', {
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  var adapter = this.subject();
  assert.ok(adapter);
});

test('it has v2 namespace', function (assert) {
  assert.equal(this.subject().namespace, "v2");
});

test('it has host', function (assert) {
  assert.equal(this.subject().host, "http://api.uhura.io");
});

test('pathForType fix users path', function(assert){
  var path = (v)=> { return this.subject().pathForType(v); };
  assert.equal(path("test"), "tests");
  assert.equal(path("subscription"), "users/subscriptions");
  assert.equal(path("suggestion"), "users/suggestions");
});

test('pathForType fix parser', function(assert){
  var path = (v)=> { return this.subject().pathForType(v); };
  assert.equal(path("test"), "tests");
  assert.equal(path("parser"), "parser");
});
