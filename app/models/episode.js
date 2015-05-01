/* global $ */
import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  channel_id: DS.attr(),
  channel: DS.belongsTo('channel'),
  listened: DS.attr(),
  published_at: DS.attr('date'),
  stopped_at: DS.attr('number'),
  source: function () {
    return this.get('source_url');
  }.property('source_url'),
  publishedAt: function () {
    return moment(this.get('published_at')).format("MMM Do YY");
  }.property('published_at'),
  _makeListened: function () {
    var url = config.API_URL + '/v2/episodes/' + this.id + '/listened',
        method = !this.get('listened') ? "POST" : "DELETE";

    $.ajax({ url: url, type: method }).then( () => {
      this.set('listened', !this.get('listened'));
    });
  }.observes('makeListened'),
  init: function () {
    this._super();
    this.set('progress', 0);
  }
});
