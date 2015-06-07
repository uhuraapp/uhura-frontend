import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('episode', {
  needs: ['model:channel']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
