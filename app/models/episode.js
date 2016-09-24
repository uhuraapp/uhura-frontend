/* global moment */
import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  channel_id: DS.attr('string'),
  channel: DS.belongsTo('channel'),
  listened: DS.attr(),
  played: computed('listened', function() {
    return this.get('listened');
  }),
  published_at: DS.attr('date'),
  stopped_at: DS.attr('number'),
  source: computed('source_url', function() {
    return this.get('source_url');
  }),
  publishedAt: computed('published_at', function() {
    return moment(this.get('published_at')).format('MMM Do YY');
  }),
  init() {
    this._super();
    this.set('progress', 0);
  }
});
