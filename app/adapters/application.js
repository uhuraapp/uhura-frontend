import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.RESTAdapter.extend({
  namespace: 'api/v2',
  host: ENV.API_URL,
});
