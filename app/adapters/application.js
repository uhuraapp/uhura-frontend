import ENV from '../config/environment';
import RESTAdapter from '../adapters/offline-rest';

export default RESTAdapter.extend({
  namespace: 'v2',
  host: ENV.API_URL,
  pathForType: function(type){
    var path = this._super(type);

    if(this.__isUserPath(type)){
      path = "users/"+path;
    }
    return path;
  },
  __isUserPath: function(type) {
    return ['subscription', 'suggestion'].indexOf(type) > -1;
  }
});
