import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-lazy-image', 'Integration | Component | channel lazy image', {
  integration: true
});

test('it renders', function(assert) {
  const channel = Ember.Object.create({ id: 177, title: 'my channel', description: 'test', image_url: '' });
  this.set('channel', channel);
  this.render(hbs`{{channel-lazy-image channel=channel}}`);
  assert.equal(this.$('img').attr('src'), '/assets/channel-placeholder.png');
});
