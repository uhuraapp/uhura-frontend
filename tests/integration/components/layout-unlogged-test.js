import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout-unlogged', 'Integration | Component | layout unlogged', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout-unlogged}}`);

  assert.ok(this.$().text().match(/Uhura/));

  // Template block usage:
  this.render(hbs`
    {{#layout-unlogged}}
      template block text
    {{/layout-unlogged}}
  `);

  assert.ok(this.$().text().match(/template block text/));
});
