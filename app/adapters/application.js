import DS from 'ember-data';
import ENV from '../config/environment';

export default  DS.RESTAdapter.extend({
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType: function(type){
    return (this.__isUserPath(type) ? "users/" : "") + (type === "parser" ? "parser" : this._super(type));
  },
  __isUserPath: function(type) {
    return ['subscription', 'suggestion'].indexOf(type) > -1;
  }
});
