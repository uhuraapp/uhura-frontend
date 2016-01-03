import DS from 'ember-data';
import Ember from 'ember';

let { computed } = Ember;
export default Ember.Mixin.create({
  title: DS.attr('string'),
  image_url: DS.attr('string'),
  description: DS.attr('string'),
  copyrigth: DS.attr('string'),
  episodes: DS.hasMany('episode', { async: false }),
  profile: DS.belongsTo('profile', { async: false }),
  profile_id: DS.attr('string'),
  raw_id: DS.attr('string'),
  subscribed: DS.attr('boolean'),
  to_view: DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  channel_id: DS.attr(),
  channel_url: DS.attr(),
  shortDescription: computed('description', function() {
    let description = this.get('description') || '';
    let shortDescription = description.substring(0, 150);
    if (description.length > shortDescription.length) {
      shortDescription += '...';
    }
    return shortDescription;
  })
});
