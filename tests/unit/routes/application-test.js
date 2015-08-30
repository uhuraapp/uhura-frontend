import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:application', {
  needs: ['service:session']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
