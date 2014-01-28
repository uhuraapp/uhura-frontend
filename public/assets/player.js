Uhura.PlayerX = {}
Uhura.PlayerX.episodes = {}
Uhura.PlayerX.events = {}
Uhura.PlayerX.play = function(id){
  if(!Uhura.PlayerX.episodes[id]){
    var el = $("[data-id="+ id + "]")
    var audio = el.data(),
      sound = soundManager.createSound({
        id: "e" + audio.id,
        url: [audio.source_url],
        onplay: Uhura.PlayerX.events.play
      });

    Uhura.PlayerX.episodes[audio.id] = sound
  }

  Uhura.PlayerX.episodes[audio.id].play()
}


Uhura.PlayerX.stop = function(id){
  if(Uhura.PlayerX.episodes[id]){
    Uhura.PlayerX.episodes[id].stop()
  }
}

soundManager.setup({
  url: '/assets/swf',
  flashVersion: 9,
  useHTML5Audio: true,
  preferFlash: false,
  waitForWindowLoad: true,
  debugMode: false,
  useFlashBlock: true,
  autoLoad: true
});

$(document).ready(function(){

});
