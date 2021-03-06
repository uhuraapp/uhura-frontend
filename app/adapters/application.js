import DS from 'ember-data';
import ENV from '../config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:uhura',
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType(type) {
    let prefix = this.__isUserType(type) ? 'users/' : '';
    return prefix + this._super(type);
  },
  __isUserType(type) {
    return ['subscription'].indexOf(type) > -1;
  }
});
