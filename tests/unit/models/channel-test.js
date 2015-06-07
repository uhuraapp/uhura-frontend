import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('channel', {
  needs: ['model:episode']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
