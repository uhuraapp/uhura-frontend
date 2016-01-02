import { moduleForModel, test } from 'ember-qunit';

moduleForModel('category', 'Unit | Model | category', {
  needs: ['model:channel']
});

test('it exists', function(assert) {
  const model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
