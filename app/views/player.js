import Ember from 'ember';

export default Ember.View.extend({
  hasModel: false,
  classNameBindings: ['hasModel::uk-hidden'],
  classNames: ["the-player"],
  contentDidChange: function() {
    var controller = this.get('controller');
    var model = controller.get('model');
    if(model){
      var audio = this.$('audio');
      audio.attr('src', model.get('source_url'));
      audio.mediaelementplayer({
        alwaysShowControls: true,
        audioVolume: 'horizontal',
        features: ['playpause','progress','volume', 'current'],
        success: this.successCallback(this)
      });
      controller.set('audio', audio[0]);
      controller.set('loading', false);
      this.set('hasModel', true);
    }
  }.observes('controller.model'),
  successCallback: function(_this){
    return function(media) {
      var controller = _this.get('controller');

      media.addEventListener('timeupdate', function () {
        var playing = Math.round(100 * media.currentTime / media.duration);
        if (playing > 95) {
          controller.get('model').set('listened', true);
        }
      }, false);

      /*
      media.addEventListener('pause', function(e) {
        App.PLAYER.isPlaying  = false;
        App.PLAYER.current.set("playing", false);
      }, false);

      media.addEventListener('play', function(e) {
        App.PLAYER.isPlaying  = true;
        App.PLAYER.current.set("playing", true);
      }, false);

      media.addEventListener('ended', App.PLAYER.APIS.audio.nextTrack);
      */
    };
  },
  mediaOptions: {
  }
});
