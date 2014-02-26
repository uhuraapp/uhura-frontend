App.Player = {}
App.Player.episodes = {}
App.Player.events = {}

//App.PlayerX.events.play = function(){
//}

// App.PlayerX.events.pause = function(){
//   App.PlayerController.set("playing", false)
// }

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

  // oldAudio = App.PlayerX.playing
  // if(oldAudio){
  //   ga('send', 'event', 'button', 'stop', 'episode', oldAudio.id);
  //   App.Player.episodes[oldAudio.id].destruct()
  // }

  // ga('send', 'event', 'button', 'play', 'episode', episode.id);

  var audio = this.getAudio(episode.id);
  audio.play();
  // App.Player.playing = episode
  // App.PlayerController.set("model", episode)
  // App.PlayerController.set("playing", true)
}

App.Player.play_pause = function(){
  // var audio = App.Player.playing,
  //     isPlaying = App.PlayerController.get("playing");

  // ga('send', 'event', 'button', (isPlaying ? 'pause' : 'resume'), 'episode', audio.id);
  // App.Player.episodes[audio.id].togglePause()
  // App.PlayerController.set("playing", !isPlaying)
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
