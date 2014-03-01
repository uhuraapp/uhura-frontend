/* global App, $,soundManager */
App.Player = {};
App.Player.episodes = {};
App.Player.events = {};
App.Player.current = {
  model: null,
  audio: null
};

App.Player.events.loading = function(){
  "use strict";
  var percent = (this.bytesLoaded * 100)/this.bytesTotal;
  $("#player-loader div.loading").css("width", percent+"%");
};

App.Player.events.playing = function(){
  "use strict";
  var playing = (this.position * 100)/this.duration;
  $("#player-loader div.playing").css("width", playing+"%");
};

App.Player.events.onload = function(){
  "use strict";
  this.onPosition(this.duration * 0.95, function() {
    var episode = App.Player.playing;
    App.Player.listened(episode);
 });
};

App.Player.getAudio = function(id){
  "use strict";
  if(!App.Player.episodes[id]){
    var el = $("[data-id="+ id + "]"),
    audio = el.data(),
    sound = soundManager.createSound({
      id: "e" + audio.id,
      url: [audio.source_url],
      onplay: App.Player.events.play,
      onpause: App.Player.events.pause,
      whileloading: App.Player.events.loading,
      whileplaying: App.Player.events.playing,
      onload: App.Player.events.onload,
      autoLoad: true
    });
    App.Player.episodes[id] = sound;
  }
  return App.Player.episodes[id];
};

App.Player.play = function(episode){
  "use strict";

  var playingEpisode = App.Player.current.model;
  if(playingEpisode){
    App.Player.stop(playingEpisode);
  }

  var audio = this.getAudio(episode.id);

  App.Player.current.audio = audio;
  App.Player.current.model = episode;

  App.PlayerController.set("model", episode);
  episode.set("playing", true);

  App.Player.current.audio.play();
};


App.Player.togglePause = function(episode) {
  "use strict";
  var isPlaying = App.Player.current.model.get("playing");
  App.Player.current.audio.togglePause();
  episode.set("playing", !isPlaying);
};

App.Player.stop = function(episode) {
  "use strict";
  App.PlayerController.set("model", null);
  $("#player-loader div").css("width", 0);
  App.Player.current.audio.destruct();
  App.Player.current.audio = App.Player.current.model = null;
  episode.set("playing", false);
};

App.Player.playpause = function(episode){
  "use strict";
  var isPlaying = App.Player.current.model;
  if(isPlaying && isPlaying.id === episode.id){
    App.Player.togglePause(episode);
  } else {
    App.Player.play(episode);
  }
};

App.Player.listened = function(episode) {
  "use strict";
  var url = "/api/episodes/" + episode.id + "/listened";
  $.post(url).then(function() {
    episode.set("listened", true);
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
  alert("mostra alerta sobre problema no flash")
  window.location.reload();
});
