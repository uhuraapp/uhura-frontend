import Ember from 'ember';

export default Ember.ObjectController.extend({
  actions: {
    playpause: function () {
      this.get('audio').play()
    }
  }
});
