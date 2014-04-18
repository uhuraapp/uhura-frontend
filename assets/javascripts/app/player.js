/* global App, $,soundManager */
App.PLAYER = {};
App.PLAYER.isPlaying = false;
App.PLAYER.current = null
App.PLAYER.APIS = {
  video: {},
  audio: {}
}

App.PLAYER.playpause = function(episode){
  "use strict";
  if(App.PLAYER.isPlaying && App.PLAYER.current.id === episode.id){
    App.PLAYER.togglePause(episode);
  } else {
    App.PLAYER.play(episode);
  }
};

App.PLAYER.togglePause = function (episode) {
  var api = App.PLAYER.getApi(episode),
      newPlayingStatus = !App.PLAYER.isPlaying;

  episode.set('playing', newPlayingStatus);
  ga('send', 'event', episode.get('mediaApi'), 'togglePause', 'togglePause episode');

  api.togglePause(episode);

  App.PLAYER.isPlaying = newPlayingStatus;
}

App.PLAYER.stopCurrent = function() {
  if(App.PLAYER.isPlaying) {
    var api = App.PLAYER.getApi(App.PLAYER.current);
    api.stop();
    App.PLAYER.current.set("playing", false);
    ga('send', 'event', App.PLAYER.current.get('mediaApi'), 'stop', 'stop episode');
    App.PLAYER.current = null
    App.PlayerController.set("model", null);
  }
}

App.PLAYER.play = function (episode) {
  App.PLAYER.stopCurrent();

  var api = App.PLAYER.getApi(episode);
  if(api.play(episode)){
    App.PLAYER.current = episode;
    App.PLAYER.isPlaying = true;
    App.PlayerController.set("model", episode);
    episode.set("playing", true);
    ga('send', 'event', episode.get('mediaApi'), 'play', 'play episode');
  }
}

App.PLAYER.listened = function(episode) {
  "use strict";
  var url = "/api/episodes/" + episode.id + "/listened";
  $.post(url).then(function() {
    episode.set("listened", true);
    ga('send', 'event', episode.get('mediaApi'), 'listened', 'listened episode');
  });
};

App.PLAYER.getApi = function (episode) {
  var api = App.PLAYER.APIS[episode.get('mediaApi')];
  return api || App.PLAYER.APIS['audio'];
}


// -- API AUDIO --
App.PLAYER.APIS.audio.episodes = {};

App.PLAYER.APIS.audio.play = function(episode) {
  "use strict";

  var audio = App.PLAYER.APIS.audio.getAudio(episode.id);
  App.PLAYER.APIS.audio.current = audio;
  App.PLAYER.APIS.audio.current.play();

  return true;
}

App.PLAYER.APIS.audio.togglePause = function(episode) {
  "use strict";
  App.PLAYER.APIS.audio.current.togglePause();
};

App.PLAYER.APIS.audio.stop = function(episode) {
  "use strict";
  App.PLAYER.APIS.audio.current.destruct();
  App.PLAYER.APIS.audio.current = null;
};

// private
App.PLAYER.APIS.audio.getAudio = function(id){
  "use strict";
  if(!App.PLAYER.APIS.audio.episodes[id]){
    var el = $("[data-id="+ id + "]"),
    audio = el.data(),
    sound = soundManager.createSound({
      id: "e" + audio.id,
      url: [audio.source_url],
      whileloading: App.PLAYER.APIS.audio.events.loading,
      whileplaying: App.PLAYER.APIS.audio.events.playing,
      onload: App.PLAYER.APIS.audio.events.onload,
      autoLoad: true
    });
    App.PLAYER.APIS.audio.episodes[id] = sound;
  }
  return App.PLAYER.APIS.audio.episodes[id];
};

App.PLAYER.APIS.audio.events = {};
App.PLAYER.APIS.audio.events.loading = function(){
  var percent = (this.bytesLoaded * 100)/this.bytesTotal,
      playing = (this.position * 100)/this.durationEstimate

  $("#player-loader div.loading").css("width", percent+"%")
};

App.PLAYER.APIS.audio.events.playing = function(){
  playing = (this.position * 100)/this.duration
  $("#player-loader div.playing").css("width", playing+"%")
};

App.PLAYER.APIS.audio.events.onload = function(){
  this.onPosition(this.duration * 0.1, function(eventPosition) {
    var model = Uhura.PlayerController.get('model')
    Uhura.Helpers.listened(model.id)
  });
};

//\ -- API VIDEO --

App.PLAYER.APIS.video.play = function(episode) {
  window.location = ("/app/" + episode.get('channel_id') +"/" +episode.id+"?play")
};

App.PLAYER.APIS.video.togglePause = function(episode) {
};

App.PLAYER.APIS.video.stop = function(episode) {
};

App.PLAYER.APIS.video.init = function() {
  App.PLAYER.APIS.video.current = sublime.player($('video')[0]);
  App.PLAYER.APIS.video.listened = false;
  App.PLAYER.APIS.current = Ember.Object.create({id: $('video').data('uid'), mediaApi: 'video'})

  App.PLAYER.isPlaying = true;

  App.PLAYER.APIS.video.current.on('timeUpdate', function(player, time) {
    var p = (time * 100)/player.duration();
    if(p > 90 && !App.PLAYER.APIS.video.listened){
      App.PLAYER.APIS.video.listened = true;
      App.PLAYER.listened(App.PLAYER.APIS.current)
    }
  });
};


soundManager.setup({
  url: "/swf",
  flashVersion: 9,
  useHTML5Audio: true,
  preferFlash: false,
  waitForWindowLoad: true,
  debugMode: true,
  useFlashBlock: false,
  autoLoad: false,
  useHighPerformance: true,
  allowScriptAccess: 'always'
});

soundManager.ontimeout(function(status) {
  // alert("mostra alerta sobre problema no flash")
  // TODO: this
  window.location.reload();
});
