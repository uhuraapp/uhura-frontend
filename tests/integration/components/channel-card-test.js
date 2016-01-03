import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-card', 'Integration | Component | channel card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  const channel = Ember.Object.create({ id: 177, title: 'my channel', description: 'test' });
  this.set('channel', channel);

  this.render(hbs`{{channel-card channel=channel}}`);

  assert.equal(this.$('h4').text().trim(), 'my channel');
  assert.equal(this.$('p').text().trim(), 'test');
});
