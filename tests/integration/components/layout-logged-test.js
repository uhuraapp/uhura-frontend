import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout-logged', 'Integration | Component | layout logged', {
  integration: true,
  needs: ['component:topbar']
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{layout-logged}}`);

  assert.ok(this.$().text().match(/Uhura/));

  this.render(hbs`
    {{#layout-logged}}
      template block text
    {{/layout-logged}}
  `);

  assert.ok(this.$().text().match(/Uhura/));
});
