import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('share-modal', 'Integration | Component | share modal', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{share-modal}}`);

  let trim = (el) => el.text().replace(/\n+| /g, '');

  assert.equal(trim(this.$()), 'ShareURLClose');

  this.render(hbs`
    {{#share-modal}}
      template block text
    {{/share-modal}}
  `);

  assert.equal(trim(this.$()), 'ShareURLClose');
});
