/* global $ */
import DS from 'ember-data';
import Config from '../config/environment';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  source_url: DS.attr('string'),
  channel: DS.belongsTo('channel'),

  listenedDidChange: function(){
    $.get(
        Config.API_URL +
        '/api/v2/episodes/' +
        this.id +
        '/listened'
      );
  }.observes('listened')
});
