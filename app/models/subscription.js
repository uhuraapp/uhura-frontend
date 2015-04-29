import DS from 'ember-data';

export default DS.Model.extend({
  raw_id:     DS.attr(),
  title:      DS.attr(),
  image_url:  DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  to_view:    DS.attr(),
  channel_id: DS.attr(),
  channel_url:DS.attr()
});
