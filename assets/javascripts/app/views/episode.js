App.EpisodeView = Ember.View.extend({
  didInsertElement: function() {
    var type = this.$("#episode").attr("class")
    if(type === 'video') {
      sublime.load();
      sublime.ready(function(){
        App.PLAYER.APIS.video.init();
      });
    } else {
      var x = this
      setTimeout(function(){
        episode = x.controller.get('content');
        App.PLAYER.play(episode);
      }, 2000)
    }
  }
});
