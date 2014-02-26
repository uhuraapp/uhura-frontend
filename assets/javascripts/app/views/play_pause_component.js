App.PlayPauseButtonComponent = Ember.Component.extend({
  layoutName: "component_play-pause-button",
  classNames: ["play-pause"],
  actions: {
     play: function(episode){
       var __playing = function(episode){
         return function(){
           // $("#episodes [data-playing]").click()

           episode.set('started', true)
           episode.set('playing', true)
           App.Player.play(episode)
           //setTimeout(function(){
           //  $("#subscribeButton").click()
           //}, 2000)
          alert("DDD")
         }
       }
       window.auth.withLoggedUser(__playing(episode));
     },

  //   play_pause: function(){
  //     Uhura.PlayerX.play_pause()
  //   }
  }
});
