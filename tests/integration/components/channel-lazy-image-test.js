import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('channel-lazy-image', 'Integration | Component | channel lazy image', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{channel-lazy-image }}`);
  assert.equal(this.$('img').attr('src'), '/assets/channel-placeholder.png');
});
