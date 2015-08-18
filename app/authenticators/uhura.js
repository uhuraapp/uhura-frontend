/* globals Promise */
import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

export default Base.extend({
  __authURLForProvider(provider) {
    return `${ENV.API_URL}/v2/auth/${provider}`
  },
  __getUserData() {
    return Ember.$.ajax({
      url: `${ENV.API_URL}/v2/user`,
      type: 'GET',
      xhrFields: {
        withCredentials: true
      }
    });
  },
  __checkLogin(loginWindow, resolve, reject) {
    return () => {
      try {
        if (loginWindow.closed) {
          this.__checkCredentials(resolve, reject);
        } else {
          window.setTimeout(this.__checkLogin(loginWindow, resolve, reject), 500);
        }
      } catch(e) {
        Ember.run(() => reject(e));
      }
    };
  },
  __checkCredentials(resolve, reject) {
    this.__getUserData().then(function(data) {
      Ember.run(() => resolve(data));
    }, function(xhr) {
      Ember.run(() => reject(xhr.responseJSON || xhr.responseText));
    });
  },

  restore(properties) {
    var propertiesObject = Ember.Object.create(properties);
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(propertiesObject.get('token'))) {
        resolve(properties);
      } else {
        reject();
      }
    });
  },
  authenticate(data) {
    if (data.provider) {
      return new Ember.RSVP.Promise( (resolve, reject) => {
        var loginWindow = window.open(this.__authURLForProvider(data.provider), '_blank', 'location=no,toolbar=no');
        window.setTimeout(this.__checkLogin(loginWindow, resolve, reject), 500);

        loginWindow.addEventListener('loadstop', (event) => {
          if(event.url.indexOf(this.__authURLForProvider(data.provider) + "/callback") === 0) {
            loginWindow.close();
            this.__checkCredentials(resolve, reject);
          }
        });
      });
    } else if (data.email && data.password) {
      return this.request('POST', '/v2/users/sign_in', data);
    }

    return Promise.reject('Error');
  },
  invalidate() {
    return new Ember.RSVP.Promise( (resolve) => {
      this.request('GET', '/v2/user/logout').always(function(){
        document.cookie = "_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        resolve();
        window.location.reload();
      });
    });
  },
  request(type, path, data) {
    data = JSON.stringify(data);
    return Ember.$.ajax({
      url: ENV.API_URL + path,
      xhrFields: {
        withCredentials: true
      },
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      type,
      data
    });
  }
});
