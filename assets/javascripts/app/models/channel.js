App.Channel = DS.Model.extend({
  title:      DS.attr(),
  image_url:  DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  description:DS.attr(),
  copyright:  DS.attr(),
  subscribed: DS.attr(),
  episodes:   DS.hasMany('episode', {async: true}),
  to_view:    DS.attr()
});


App.Subscription = DS.Model.extend({
  title:      DS.attr(),
  image_url:  DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  to_view:    DS.attr()
});
