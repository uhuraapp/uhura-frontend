import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  listened: DS.attr(),
  channel: DS.belongsTo('channel'),
  published_at: DS.attr('date'),
  init: function () {
    this._super();
    this.set('progress', 0);
  }
});
