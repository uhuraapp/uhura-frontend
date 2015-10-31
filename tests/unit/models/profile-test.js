import { moduleForModel, test } from 'ember-qunit';

moduleForModel('profile', 'Unit | Model | profile', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  const model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
