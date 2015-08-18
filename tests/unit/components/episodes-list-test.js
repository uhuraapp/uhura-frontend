import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('episodes-list', {
  needs: ['component:infinite-scroll']
});

test('it renders', function(assert) {
  assert.expect(2);

  let component = this.subject();
  assert.equal(component._state, 'preRender');

  this.render();
  assert.equal(component._state, 'inDOM');
});
