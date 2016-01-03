import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const searchStub = Ember.Service.extend({
  q: null
});

const createObjects = () => {
  const object = (title) => Ember.Object.create({ title, description: '' });
  return [object('Channel 1'), object('Channel 2')];
};

moduleForComponent('channel-search', 'Integration | Component | channel search', {
  integration: true,
  beforeEach() {
    this.register('service:search', searchStub);
    this.inject.service('search', { as: 'search' });
  }
});

test('it renders', function(assert) {
  this.set('query', 'testing');
  this.set('search.noResults', true);
  this.render(hbs`{{channel-search query=query}}`);

  assert.equal(this.$('input').val(), 'testing');

  assert.equal(this.$('.results').text().trim(), 'No results for \"testing\".');

  this.set('search.noResults', false);
  this.set('search.results', createObjects());

  this.render(hbs`{{channel-search query=query}}`);
  assert.equal(this.$('.results h5').text().trim(), 'Channel 1Channel 2');
});
