import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  __authURLForProvider: function(provider){
    return ENV.API_URL + "/v2/auth/" + provider;
  },
  __getUserData: function() {
    return Ember.$.ajax({
      url: ENV.API_URL + "/v2/user",
      type: "GET",
      xhrFields: {
        withCredentials: true
      }
    });
  },
  __checkLogin: function(loginWindow, resolve, reject) {
    var _this = this;
    return function () {
      try {
        if (loginWindow.closed) {
          _this.__checkCredentials(resolve, reject);
        } else {
          window.setTimeout(_this.__checkLogin(loginWindow, resolve, reject), 500);
        }
      } catch(e) {
        Ember.run(function() { reject(e); });
      }
    };
  },
  __checkCredentials: function(resolve, reject) {
    this.__getUserData().then(function(data){
      Ember.run(function () { resolve(data); });
    }, function(xhr) {
      Ember.run(function (){ reject(xhr.responseJSON || xhr.responseText); });
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
      var loginWindow = window.open(_this.__authURLForProvider(provider), '_blank', 'location=no,toolbar=no');
      window.setTimeout(_this.__checkLogin(loginWindow, resolve, reject), 500);

      loginWindow.addEventListener('loadstop', function (event) {
        if(event.url.indexOf(_this.__authURLForProvider(provider) + "/callback") === 0) {
          loginWindow.close();
          _this.__checkCredentials(resolve, reject);
        }
      });
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
        window.location.reload()
      });
    });
  }
});
