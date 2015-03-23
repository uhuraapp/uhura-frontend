import Ember from 'ember';
import cacheChannel from '../utils/cache-channel';

export default Ember.ArrayController.extend({
  cacheChannel: function () {
    var model = this.get('model');
    // cacheChannel(this.emberSync, model[model.length - 1]);
  }.observes('@each')
});
