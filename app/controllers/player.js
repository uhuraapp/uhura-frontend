import Ember from 'ember';

export default Ember.ObjectController.extend({
  playerChanges: function() {
    var model = this.get('model');
    model.set('playing', this.get('playing'));
  }.observes('playing'),

  modelWillChanges: function() {
    var model;
    if(model = this.get('model')) {
      model.set('playing', false);
    }
  }.observesBefore('model'),

  actions: {
    playpause: function () {
      var audio = this.get('audio');
      this.get('playing') ? audio.pause() : audio.play();
      this.set('playing', !this.get('playing'));
    }
  }
});
