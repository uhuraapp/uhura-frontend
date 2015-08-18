import DS from 'ember-data';
import Ember from 'ember';
import ENV from '../config/environment';

let { Inflector: { inflector } } = Ember;

inflector.uncountable('parser');

export default DS.RESTAdapter.extend({
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType(type){
    let prefix = this.__isUserType(type) ? 'users/' : '';
    return prefix + this._super(type);
  },
  __isUserType(type) {
    return ['subscription', 'suggestion'].indexOf(type) > -1;
  }
});
