import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  authURLForProvider: function(provider){
    return ENV.API_URL + "/v2/auth/" + provider;
  },
  getUserData: function(){
    return Ember.$.ajax({
      url: ENV.API_URL + "/v2/user",
      type: "GET",
      xhrFields: {
        withCredentials: true
      }
    });
  },
  restore: function(properties) {
    var propertiesObject = Ember.Object.create(properties);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(propertiesObject.get('token'))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate: function(provider) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var loginWindow = window.open(_this.authURLForProvider(provider));
      var checkLogin = function(){
        try {
          if(loginWindow.closed) {
            _this.getUserData().then(function(data) {
              Ember.run(function() { resolve(data); });
            }, function(xhr) {
              Ember.run(function() { reject(xhr.responseJSON || xhr.responseText); });
            });
          } else {
            window.setTimeout(checkLogin, 500);
          }
        } catch(e){
          Ember.run(function() { reject(e); });
        }
      };

      window.setTimeout(checkLogin, 500);
    });
  },
  invalidate: function() {
    return new Ember.RSVP.Promise(function(resolve) {
      Ember.$.ajax({
        url: ENV.API_URL + "/v2/user/logout",
        type: "GET",
        xhrFields: {
          withCredentials: true
        }
      }).always(function(){
        document.cookie = "_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        resolve();
      });
    });
  }
});
