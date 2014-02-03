Uhura.PlayerX = {}
Uhura.PlayerX.episodes = {}
Uhura.PlayerX.events = {}

//Uhura.PlayerX.events.play = function(){
//}

// Uhura.PlayerX.events.pause = function(){
//   Uhura.PlayerController.set("playing", false)
// }

Uhura.PlayerX.events.loading = function(){
  var percent = (this.bytesLoaded * 100)/this.bytesTotal,
      playing = (this.position * 100)/this.duration

  $("header #loader div.loading").css("width", percent+"%")
}

Uhura.PlayerX.events.playing = function(){
  playing = (this.position * 100)/this.duration
  $("header #loader div.playing").css("width", playing+"%")
}

Uhura.PlayerX.events.onload = function(){
  this.onPosition(this.duration * 0.9, function(eventPosition) {
    Uhura.PlayerController.get('model').set('listened', true)
  });
}


Uhura.PlayerX.getAudio = function(id){
 if(!Uhura.PlayerX.episodes[id]){
    var el = $("[data-id="+ id + "]"),
        audio = el.data(),
        sound = soundManager.createSound({
          id: "e" + audio.id,
          url: [audio.source_url],
          onplay: Uhura.PlayerX.events.play,
          onpause: Uhura.PlayerX.events.pause,
          whileloading: Uhura.PlayerX.events.loading,
          whileplaying: Uhura.PlayerX.events.playing,
          onload: Uhura.PlayerX.events.onload
        });
    Uhura.PlayerX.episodes[audio.id] = sound
  }
  return Uhura.PlayerX.episodes[id]
}

// Uhura.PlayerX.stop = function(){
//   soundManager.stopAll();
// }

Uhura.PlayerX.play = function(episode){
  oldAudio = Uhura.PlayerX.playing
  if(oldAudio){
    ga('send', 'event', 'button', 'stop', 'episode', oldAudio.id);
    Uhura.PlayerX.episodes[oldAudio.id].destruct()
  }

  ga('send', 'event', 'button', 'play', 'episode', episode.id);

  var audio = this.getAudio(episode.id);
  audio.play();
  Uhura.PlayerX.playing = episode
  Uhura.PlayerController.set("model", episode)
  Uhura.PlayerController.set("playing", true)
}

Uhura.PlayerX.play_pause = function(){
  var audio = Uhura.PlayerX.playing,
      isPlaying = Uhura.PlayerController.get("playing");

  ga('send', 'event', 'button', (isPlaying ? 'pause' : 'resume'), 'episode', audio.id);
  Uhura.PlayerX.episodes[audio.id].togglePause()
  Uhura.PlayerController.set("playing", !isPlaying)
}

// Uhura.PlayerX.pause = function(id){
//   var audio = this.getAudio(id);
//   audio.pause();
// }

soundManager.setup({
  url: '/assets/swf',
  flashVersion: 9,
  useHTML5Audio: true,
  preferFlash: false,
  waitForWindowLoad: true,
  debugMode: false,
  useFlashBlock: false,
  autoLoad: true
});
