import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout-unlogged', 'Integration | Component | layout unlogged', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{layout-unlogged}}`);

  assert.ok(this.$().text().match(/Uhura/));

  this.render(hbs`
    {{#layout-unlogged}}
      template block text
    {{/layout-unlogged}}
  `);

  assert.ok(this.$().text().match(/Uhura/));
});
