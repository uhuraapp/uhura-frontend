import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    'use strict';
    return this.store.find('subscription');
  },
});
