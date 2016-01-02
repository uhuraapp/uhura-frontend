import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sidebar-menu', 'Integration | Component | sidebar menu', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  this.render(hbs`{{sidebar-menu}}`);

  const links = [];
  this.$().find('a').each((_,a) => links.push($(a).text().trim()));

  assert.deepEqual(links, ['Subscriptions', 'Settings', 'Sign Out']);

  assert.equal(this.$().find('.mdl-layout-title').text(), 'Uhura');
});
