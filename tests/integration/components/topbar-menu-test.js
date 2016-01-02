import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const sessionServiceStub = Ember.Service.extend({
  isAuthenticated: false
});

moduleForComponent('topbar-menu', 'Integration | Component | topbar menu', {
  integration: true,
  beforeEach() {
     this.register('service:session', sessionServiceStub);
     this.inject.service('session', { as: 'session' });
   }
});

test('it renders', function(assert) {
  assert.expect(5);

  this.render(hbs`{{topbar-menu}}`);

  assert.equal(this.$().find('h1 a').text().trim(), 'Uhura');
  assert.equal(this.$().find('button').text().trim(), 'Login');

  this.set('session.isAuthenticated', true);

  assert.equal(this.$().find('a').length, 3);
  assert.equal(this.$().find('a:eq(1)').text().trim(), 'Sign Out');
  assert.equal(this.$().find('a:eq(2)').text().trim(), 'Back to Subscriptions');
});
