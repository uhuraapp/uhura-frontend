import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('categories-list', 'Integration | Component | categories list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  const category = Ember.Object.create({ name: 'Test Cat' });

  this.set('categories', []);

  this.render(hbs`
    {{categories-list categories=categories x=x}}
  `);

  assert.equal(this.$('h4').text().trim(), '');

  this.set('categories', [ category  ]);

  this.render(hbs`
    {{categories-list categories=categories}}
  `);

  assert.equal(this.$('h4').text().trim(), category.get('name'));
});
