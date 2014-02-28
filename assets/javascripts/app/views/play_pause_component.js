App.PlayPauseButtonComponent = Ember.Component.extend({
  layoutName: "component/play-pause-button",
  classNames: ["play-pause"],
  actions: {
     playpause: function(episode){
       var __playing = function(episode){
         return function(){
            App.Player.playpause(episode)
           // setTimeout(function(){
           //   $("#subscribeButton").click()
           // }, 2000)
         }
       }
       window.auth.withLoggedUser(__playing(episode));
     },
  }
});
