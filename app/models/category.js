import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  uri: DS.attr(),
  channels: DS.hasMany('channel')
});
