/* global lunr */

import Ember from 'ember';

export default Ember.Service.extend({
  index() {
    return this.__index || (this.__index = this.__createIndex());
  },
  add(model) {
    this.index().add(model);
  },
  search(term) {
    return this.index().search(term);
  },
  __index: null,
  __createIndex() {
    return lunr(function() {
      this.field('title', { boost: 10 });
      this.field('description');
      this.ref('id');
    });
  }
});
