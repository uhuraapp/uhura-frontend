/* global $ */
import DS from 'ember-data';
import Config from '../config/environment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  listened: DS.attr(),
  channel: DS.belongsTo('channel'),
  published_at: DS.attr('string'),

  listenedDidChange: function(){
    if(this.get('listened')) {
      $.get(
        Config.API_URL +
        '/v2/episodes/' +
        this.id +
        '/listened'
      );
    }
  }.observes('listened')
});
