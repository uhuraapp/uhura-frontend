/* globals Filer */

import Ember from 'ember';

export default Ember.Object.extend({
  write(filePath, data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.__withOpenedFS().then(() => {
        this.FS.write(filePath, { data, type: data.type }, resolve, reject);
      });
    });
  },
  read(filePath) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.__withOpenedFS().then(() => {
        this.FS.open(filePath, resolve, reject);
      });
    });
  },
  __withOpenedFS() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      this.FS = new Filer();
      this.FS.init({ persistent: true, size: this.__requestSize() }, () => {
        resolve();
      }, reject);
    });
  },
  __requestSize() {
    return (10 * 1024 * 1024 * 1024);
  }
});
