import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('subscription', {
  needs: ['model:episode', 'model:profile']
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});
