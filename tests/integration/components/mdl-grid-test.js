import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mdl-grid', 'Integration | Component | mdl grid', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(3);

  this.render(hbs`{{mdl-grid}}`);

  assert.equal(this.$().text().trim(), '');

  this.render(hbs`
    {{#mdl-grid}}
      template block text
    {{/mdl-grid}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  assert.ok(this.$().find('div').hasClass('mdl-grid'));
});
