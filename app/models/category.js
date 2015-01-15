import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  channel: DS.attr(),
  thumb_url: function(){
    return this.get('channel').image_url
  }.property('channel')
});
