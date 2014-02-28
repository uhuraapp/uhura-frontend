App.Player = {}
App.Player.episodes = {}
App.Player.events = {}

App.Player.events.play = function(){
}

App.Player.events.pause = function(){
  // App.PlayerController.set("playing", false)
}

App.Player.events.loading = function(){
  // var percent = (this.bytesLoaded * 100)/this.bytesTotal,
  //     playing = (this.position * 100)/this.duration

  // $(".PlayerLoader div.loading").css("width", percent+"%")
}

App.Player.events.playing = function(){
  // playing = (this.position * 100)/this.duration
  // $(".PlayerLoader div.playing").css("width", playing+"%")
}

App.Player.events.onload = function(){
  // this.onPosition(this.duration * 0.9, function(eventPosition) {
  //   var model = App.PlayerController.get('model')
  //   App.Helpers.listened(model.id)
  // });
}


App.Player.getAudio = function(id){
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
    onload: App.Player.events.onload
  });
  App.Player.episodes[audio.id] = sound
}
return App.Player.episodes[id]
}

App.Player.play = function(episode){
  // $(".PlayerLoader div").css("width", 0);

  playingEpisode = App.Player.playing
  if(playingEpisode){
  //   ga('send', 'event', 'button', 'stop', 'episode', oldAudio.id);

    App.Player.stop(playingEpisode)
  }

  // ga('send', 'event', 'button', 'play', 'episode', episode.id);

  var audio = this.getAudio(episode.id);
  audio.play();

  App.Player.playing = episode


  episode.set("playing", true)
}


App.Player.pause = function(episode) {
  App.Player.episodes[episode.id].pause()
  episode.set("playing", false)
}

App.Player.stop = function(episode) {
  App.Player.episodes[playingEpisode.id].destruct()
  episode.set("playing", false)
}

App.Player.playpause = function(episode){
  var isPlaying = episode.get("playing");

  if(isPlaying){
    App.Player.pause(episode);
  } else {
    App.Player.play(episode);
  }
  // ga('send', 'event', 'button', (isPlaying ? 'pause' : 'resume'), 'episode', audio.id);
}

soundManager.setup({
  url: '/swf',
  flashVersion: 9,
  useHTML5Audio: true,
  preferFlash: false,
  waitForWindowLoad: true,
  debugMode: false,
  useFlashBlock: false,
  autoLoad: true
});
