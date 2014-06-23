App.PlayPauseButtonComponent = Ember.Component.extend({
  layoutName: "component/play-pause-button",
  classNames: ["play-pause"],
  actions: {
    playpause: function(episode){
      var __playing = function(episode){
        return function(){
          App.PLAYER.playpause(episode);
        };
      };
      window.auth.withLoggedUser(__playing(episode));
    },
  }
});
