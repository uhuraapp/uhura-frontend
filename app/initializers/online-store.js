import DS from 'ember-data';
import ENV from '../config/environment';

var restAdapter = DS.RESTAdapter.extend({
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType: function(type){
    return (this.__isUserPath(type) ? "users/" : "") + (type === "parser" ? "parser" : this._super(type));
  },
  __isUserPath: function(type) {
    return ['subscription', 'suggestion'].indexOf(type) > -1;
  }
});

var OnlineStore = DS.Store.extend({
  adapterFor: function() {
    return this.container.lookup('adapter:_online_adapter');
  }
});

export function initialize(container, application) {
  container.register('store:online', OnlineStore);
  container.register('adapter:_online_adapter', restAdapter);

  application.inject('route',      'onlineStore', 'store:online');
  application.inject('controller', 'onlineStore', 'store:online');
}

export default {
  name: 'online-store',
  initialize: initialize
};
