import Ember from 'ember';

export default Ember.ObjectController.extend({
  loaded: true,
  miniPlayer: true,
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
      var fn = this.get('playing') ? audio.pause : audio.play;
      fn();
      this.set('playing', !this.get('playing'));
    },
    togglePlayer: function() {
      var miniPlayer = this.get('miniPlayer');
      this.set('miniPlayer', !miniPlayer);
      Ember.$('body').css('overflow', !miniPlayer ? "auto" : "hidden");
    }
  }
});
