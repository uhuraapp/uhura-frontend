import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('channel', {
  needs: ['model:episode', 'model:profile']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
