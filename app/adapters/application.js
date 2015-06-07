import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';

var inflector = Ember.Inflector.inflector;
inflector.uncountable('parser');

export default  DS.RESTAdapter.extend({
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType: function(type){
    var prefix = this.__isUserType(type) ? "users/" : "";
    return prefix + this._super(type);
  },
  __isUserType: function(type) {
    return ['subscription', 'suggestion'].indexOf(type) > -1;
  }
});
