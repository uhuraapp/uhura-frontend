/* global $ */
import Ember from 'ember';

export default Ember.View.extend({
  hasModel: false,
  classNameBindings: ['hasModel::uk-hidden', 'controller.miniPlayer:player-mini:player-full'],
  classNames: ["the-player"],
  click: function(e) {
    var controller = this.get('controller');

    if((!$(e.target).is(".playpause") && controller.get('miniPlayer')) || ($(e.target).is(".close"))) {
      controller.send('togglePlayer');
    }
  },
  contentDidChange: function() {
    var controller = this.get('controller');
    var model = controller.get('model');
    if(model){
      controller.set('loaded', false);
      var audio = this.$('audio');
      audio.attr('src', model.get('source_url'));
      audio.mediaelementplayer({
        pluginPath: 'assets/',
        enablePluginDebug: true,
        plugins: ['flash','silverlight'],
        alwaysShowControls: true,
        audioVolume: 'vertical',
        features: ['playpause','progress','volume', 'current'],
        success: this.successCallback(this)
      });
      controller.set('audio', audio[0]);
      this.set('hasModel', true);
    }
  }.observes('controller.model'),
  successCallback: function(_this){
    return function(media) {
      var controller = _this.get('controller'),
          db = controller.get('db');

      media.addEventListener('timeupdate', function () {
        var playing = Math.round(100 * media.currentTime / media.duration);
        if (playing > 95) { controller.get('model').set('listened', true); }

        db.playing.update({
          currentTime: media.currentTime,
          episodeId: controller.get('model.id')
        });
      }, false);

      media.addEventListener('loadeddata', function() {
        controller.set('loaded', true);
      });

      media.addEventListener('ended', function(){
        var episodes = Ember.$('li.episode').get().reverse();
        for (var i = 0; i <= episodes.length; i++) {
          var episode = $(episodes[i]);
          if(episode.find('button.typcn-tick').length === 0) {
            episode.find('.play').click();
            break;
          }
        }
      });
    };
  }
});
