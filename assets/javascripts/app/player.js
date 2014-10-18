/* global App, $,soundManager */

App.PLAYER = {};
App.PLAYER.isPlaying = true;
App.PLAYER.current = null;
App.PLAYER.APIS = {
  video: {},
  audio: {}
};

App.PLAYER.playpause = function(episode){
  "use strict";
  if(App.PLAYER.isPlaying && App.PLAYER.current && App.PLAYER.current.id === episode.id){
    App.PLAYER.togglePause(episode);
  } else {
    App.PLAYER.play(episode);
  }
};

App.PLAYER.togglePause = function (episode) {
    "use strict";

  var api = App.PLAYER.getApi(episode),
      newPlayingStatus = !App.PLAYER.isPlaying;

  episode.set('playing', newPlayingStatus);
  ga('send', 'event', episode.get('mediaApi'), 'togglePause', 'togglePause episode');

  api.togglePause(episode);

  App.PLAYER.isPlaying = newPlayingStatus;
};

App.PLAYER.stopCurrent = function() {
  if(App.PLAYER.isPlaying) {
    try {
      var api = App.PLAYER.getApi(App.PLAYER.current);
      api.stop();
      App.PLAYER.current.set("playing", false);
      ga('send', 'event', App.PLAYER.current.get('mediaApi'), 'stop', 'stop episode');
    }catch(err) {
      ga('send', 'event', 'video', 'stop', 'stop episode');
    }
    App.PLAYER.current = null;
    App.PLAYER.isPlaying = false;
    App.PlayerController.set("model", null);
  }
};

App.PLAYER.play = function (episode) {
  App.PLAYER.stopCurrent();

  var api = App.PLAYER.getApi(episode);
  if(api.play(episode)){
    App.PLAYER.current = episode;
    App.PLAYER.isPlaying = true;
    App.PlayerController.set("model", episode);
    episode.set("playing", true);
    App.PlayerController.set("isPlaying", true);
    window.setTimeout(api.postPlay, 1000);
    ga('send', 'event', episode.get('mediaApi'), 'play', 'play episode');
  }
};

App.PLAYER.listened = function(episode) {
  "use strict";
  var url = "/api/episodes/" + episode.id + "/listened";
  episode.set("listened", true);
  $.post(url).then(function() {
    ga('send', 'event', episode.get('mediaApi'), 'listened', 'listened episode');
  });
};

App.PLAYER.getApi = function (episode) {
  var api = App.PLAYER.APIS[episode.get('mediaApi')];
  return api || App.PLAYER.APIS.audio;
};

// -- API AUDIO --

App.PLAYER.APIS.audio.play = function(episode) {
  "use strict";
  var el = App.PLAYER.APIS.audio.el()[0];
  if(el.player && el.player.media.paused) {
    episode.set("playing", true);
    App.PLAYER.isPlaying  = true;
    App.PLAYER.APIS.audio.el()[0].player.media.play();
  } else {
    App.PLAYER.APIS.audio.setSrc(episode.get("source_url"));
  }
  return true;
};

App.PLAYER.APIS.audio.togglePause = function(episode) {
  "use strict";
  var fn = App.PLAYER.isPlaying ? App.PLAYER.APIS.audio.pause : App.PLAYER.APIS.audio.play;
  fn(episode);
};

App.PLAYER.APIS.audio.stop = function(episode) {
  "use strict";
  App.PLAYER.APIS.audio.el().stop();
};

App.PLAYER.APIS.audio.pause = function(episode) {
  App.PLAYER.isPlaying  = false;
  episode.set("playing", false);
  App.PLAYER.APIS.audio.el()[0].player.media.pause();
};

window.listenedWorker = {};

App.PLAYER.APIS.audio.postPlay = function(){
  App.PLAYER.APIS.audio.el().mediaelementplayer({
    alwaysShowControls: true,
    audioVolume: 'horizontal',
    features: ['playpause','progress','volume'],
    success: function(media, node, player) {
      media.addEventListener('timeupdate', function (e) {
        var playing = Math.round(100 * media.currentTime / media.duration);
        if (playing > 95 ) {
          var model = App.PLAYER.current;
          if (window.listenedWorker[model.id] !== true) {
            window.listenedWorker[model.id] = true;
            App.PLAYER.listened(model);
          }
        }
      }, false);

      media.addEventListener('pause', function(e) {
        App.PLAYER.isPlaying  = false;
        App.PLAYER.current.set("playing", false);
      }, false);

      media.addEventListener('play', function(e) {
        App.PLAYER.isPlaying  = true;
        App.PLAYER.current.set("playing", true);
      }, false);
    }
  });
  App.PLAYER.APIS.audio.el()[0].play();
};

App.PLAYER.APIS.audio.setSrc = function(source_url){
  "use strict";
  App.PLAYER.APIS.audio.el().attr("src", source_url);
};

App.PLAYER.APIS.audio.el = function() {
  return $("#audio-player");
};

//\ -- API VIDEO --

App.PLAYER.APIS.video.play = function(episode) {
  App.Router.router.transitionTo('episode', episode.get('channel_id'), episode.id);
};

App.PLAYER.APIS.video.togglePause = function(episode) {
};

App.PLAYER.APIS.video.stop = function(episode) {
};
App.PLAYER.APIS.video.postPlay = function(episode) {
};

App.PLAYER.APIS.video.init = function() {
  App.PLAYER.APIS.video.current = sublime.player($('video')[0]);
  App.PLAYER.APIS.video.listened = false;
  App.PLAYER.APIS.current = Ember.Object.create({id: $('video').data('uid'), mediaApi: 'video'});

  App.PLAYER.isPlaying = true;

  App.PLAYER.APIS.video.current.on('timeUpdate', function(player, time) {
    var p = (time * 100)/player.duration();
    if(p > 90 && !App.PLAYER.APIS.video.listened){
      App.PLAYER.APIS.video.listened = true;
      App.PLAYER.listened(App.PLAYER.APIS.current);
    }
  });
};
