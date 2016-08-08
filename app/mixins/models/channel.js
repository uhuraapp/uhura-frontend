import DS from 'ember-data';
import Ember from 'ember';

export default Ember.Mixin.create({
  title: DS.attr('string'),
  image_url: DS.attr('string'),
  description: DS.attr('string'),
  copyrigth: DS.attr('string'),
  episodes: DS.hasMany('episode', { async: false }),
  profile_id: DS.attr('string'),
  raw_id: DS.attr('string'),
  subscribed: DS.attr('boolean'),
  to_view: DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  channel_id: DS.attr(),
  channel_url: DS.attr()
});
