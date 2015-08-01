import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('category', {
  // Specify the other units that are required for this test.
  needs: ['model:channel', 'model:episode']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
