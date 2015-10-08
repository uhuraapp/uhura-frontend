import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('the-player', 'Integration | Component | the player', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{the-player}}`);

  assert.equal(this.$().find('.playpause').text().trim(), 'play_arrow');

  // Template block usage:
  this.render(hbs`
    {{#the-player}}
      template block text
    {{/the-player}}
  `);

  assert.equal(this.$().find('.playpause').text().trim(), 'play_arrow');
});
