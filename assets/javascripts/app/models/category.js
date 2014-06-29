App.Category = DS.Model.extend({
  name: DS.attr(),
  channels: DS.hasMany('channel', {async: true})
});
