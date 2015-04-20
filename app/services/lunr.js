import Ember from 'ember';

export default Ember.Service.extend({
  index: function () {
    return this.__index || (this.__index = this.__createIndex());
  },
  add: function(model) {
    this.index().add(model);
  },
  search: function (term) {
    return this.index().search(term);
  },
  __index: null,
  __createIndex: function () {
    return lunr(function () {
      this.field('title', {boost: 10});
      this.field('description');
      this.ref('id');
    });
  }
});
