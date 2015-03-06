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
      if(this.get('playing')){ audio.pause(); } else {
        this.get('db').playing.query( 'episodeId' )
          .only( this.get('model.id') )
          .execute()
          .then( function ( results ) {
            if(results[0]) { audio.setCurrentTime(results[0].currentTime); }
            audio.play();
          });
      }
      this.set('playing', !this.get('playing'));
    },
    togglePlayer: function() {
      var miniPlayer = this.get('miniPlayer');
      this.set('miniPlayer', !miniPlayer);
    }
  }
});
