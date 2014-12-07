import Ember from 'ember';
import Config from '../config/environment';

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

  listenedChanges: function() {
    var model = this.get('model');
    if (this.get('playing')) {
      this.send('listened', model.id)
    }
  }.observes('model.listened'),

  actions: {
    playpause: function () {
      var audio = this.get('audio');
      this.get('playing') ? audio.pause() : audio.play();
      this.set('playing', !this.get('playing'));
    },
    listened: function(modelId) {
      $.get(
        Config.API_URL +
        '/api/v2/episodes/' +
        modelId +
        '/listened'
      )
    }
  }
});
