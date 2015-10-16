import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from '../config/environment';

let { RSVP: { Promise } } = Ember;

export default Base.extend({
  __authURLForProvider(provider) {
    return `${ENV.API_URL}/v2/auth/${provider}`;
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
          this.checkCredentials(resolve, reject);
        } else {
          window.setTimeout(this.__checkLogin(loginWindow, resolve, reject), 500);
        }
      } catch(e) {
        Ember.run(() => reject(e));
      }
    };
  },
  checkCredentials(resolve, reject) {
    this.__getUserData().then((data) => {
      Ember.run(() => resolve(data));
      this._setUser(data);
    }, function() {
      Ember.run(() => reject('Error: Could not authenticate using external service'));
    });
  },

  restore(properties) {
    let propertiesObject = Ember.Object.create(properties);
    return new Promise((resolve, reject) => {
      if (!Ember.isEmpty(propertiesObject.get('token'))) {
        resolve(properties);
        this._setUser(properties);
      } else {
        reject();
      }
    });
  },

  authenticate(data) {
    if (data.provider) {
      return new Promise((resolve, reject) => {
        let loginWindow = window.open(this.__authURLForProvider(data.provider), '_blank', 'location=no,toolbar=no');
        window.setTimeout(this.__checkLogin(loginWindow, resolve, reject), 500);

        loginWindow.addEventListener('loadstop', (event) => {
          if (event.url.indexOf(`${this.__authURLForProvider(data.provider)}/callback`) === 0) {
            loginWindow.close();
            this.checkCredentials(resolve, reject);
          }
        });
      });
    } else if (data.email && data.password) {
      return this.request('POST', '/v2/users/sign_in', data).catch(()=> {
        return Promise.reject('Error: email or password invalid');
      });
    } else if (data.email && !data.password) {
      return Promise.reject('Error: password is required');
    } else if (data.password && !data.email) {
      return Promise.reject('Error: email is required');
    }

    return Promise.reject('Error: email and password is required');
  },

  invalidate() {
    return new Promise((resolve) => {
      this.request('GET', '/v2/users/logout').then(this._logout(resolve), this._logout(resolve));
    });
  },

  _logout(resolve) {
    return () => {
      resolve();
      document.cookie = '_session=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.reload();
    };
  },

  request(type, path, data) {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      Ember.$.ajax({
        url: ENV.API_URL + path,
        xhrFields: {
          withCredentials: true
        },
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        type,
        data,
        success: resolve,
        error: reject
      });
    });
  } ,

  _setUser(user) {
    window.UserVoice.push(['identify', {
      email:      user.email,
      name:       user.name,
      id:         user.id,
      account: {
        id: user.id
      }
    }]);
  }
});
