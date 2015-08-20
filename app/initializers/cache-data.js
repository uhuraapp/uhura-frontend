// import Ember from 'ember';
export function initialize(container, application) {
  application.deferReadiness();

  // var store = container.lookup('store:main');
  // Ember.RSVP.Promise.resolve().then(function(){
  //  return store.find('episode');
  // }).then(function() {
  //  return store.find('channel');
  // }).then(function(){
  //  return store.find('subscription');
  // }).then(function(){
  application.advanceReadiness();
  // });
}

export default {
  name: 'cache-data',
  initialize,
  after: 'store'
};
