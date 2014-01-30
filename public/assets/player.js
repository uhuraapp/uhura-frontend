Uhura.PlayerX = {}
Uhura.PlayerX.episodes = {}
Uhura.PlayerX.events = {}

Uhura.PlayerX.events.play = function(){
  Uhura.PlayerController.set("playing", true)
}

Uhura.PlayerX.events.pause = function(){
  Uhura.PlayerController.set("playing", false)
}

Uhura.PlayerX.play = function(id){
  if(!Uhura.PlayerX.episodes[id]){
    var el = $("[data-id="+ id + "]")
    var audio = el.data(),
      sound = soundManager.createSound({
        id: "e" + audio.id,
        url: [audio.source_url],
        onplay: Uhura.PlayerX.events.play,
        onpause: Uhura.PlayerX.events.pause
      });

    Uhura.PlayerX.episodes[audio.id] = sound
  }

  Uhura.PlayerX.episodes[audio.id].play()
}

Uhura.PlayerX.stop = function(id){
  soundManager.stopAll()
}

Uhura.PlayerX.playPause = function(id, isPlaying){
  if(isPlaying){
    Uhura.PlayerX.episodes[id].pause()
  } else {
    Uhura.PlayerX.episodes[id].resume()
  }
}

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
