import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-card', 'Integration | Component | channel card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  const channel = Ember.Object.create({ id: 177 });
  this.set('channel', channel);

  this.render(hbs`{{channel-card channel=channel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#channel-card channel=channel}}
      template block text
    {{/channel-card}}
  `);

  assert.equal(this.$().text().trim(), '');
});
