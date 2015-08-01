/* global Ember */

import {
  moduleForComponent,
  test
} from 'ember-qunit';

import i18n from 'i18n';
Ember.Handlebars.registerBoundHelper('t', i18n.t);

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
