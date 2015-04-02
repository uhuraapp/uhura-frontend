/* global $ */
import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  listened: DS.attr(),
  published_at: DS.attr('date'),
  source: function () {
    return this.get('source_url');
  }.property('source_url'),
  _makeListened: function () {
    var url = config.API_URL + '/v2/episodes/' + this.id + '/listened',
        method = !this.get('listened') ? "POST" : "DELETE";

    $.ajax({ url: url, type: method }).then( () => {
      this.set('listened', !this.get('listened'));
    });
  }.observes('makeListened'),
  stopped_at: DS.attr('number'),
  init: function () {
    this._super();
    this.set('progress', 0);
  }
});
