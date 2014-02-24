var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


App.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});
