import DS from 'ember-data';
import Ember from 'ember';

const  { computed } = Ember;
const { attr, hasMany } = DS;

export default DS.Model.extend({
  name: attr('string'),
  channels: hasMany('channel'),
  sixChannels: computed.filter('channels', (_, index) => index < 6),
  channelsLength: computed.alias('channels.length'),
  moreThanSixChannels: computed.gt('channelsLength', 6)
});
