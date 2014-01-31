Uhura.PlayerX = {}
Uhura.PlayerX.episodes = {}
Uhura.PlayerX.events = {}

Uhura.PlayerX.events.play = function(){
  Uhura.PlayerController.set("playing", true)
}

Uhura.PlayerX.events.pause = function(){
  Uhura.PlayerController.set("playing", false)
}

Uhura.PlayerX.getAudio = function(id){
 if(!Uhura.PlayerX.episodes[id]){
    var el = $("[data-id="+ id + "]"),
        audio = el.data(),
        sound = soundManager.createSound({
          id: "e" + audio.id,
          url: [audio.source_url],
          onplay: Uhura.PlayerX.events.play,
          onpause: Uhura.PlayerX.events.pause
        });
    Uhura.PlayerX.episodes[audio.id] = sound
  }
  return Uhura.PlayerX.episodes[id]
}

Uhura.PlayerX.stop = function(){
  soundManager.stopAll();
}

Uhura.PlayerX.play = function(id){
  var audio = this.getAudio(id);
  soundManager.pauseAll();
  audio.play();
}

Uhura.PlayerX.pause = function(id){
  var audio = this.getAudio(id);
  audio.pause();
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
