import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  top: function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get(config.API_URL + "/v2/subscriptions/top").then(function(data){
        resolve(data.channels);
      }, reject);
    });
  }
});
