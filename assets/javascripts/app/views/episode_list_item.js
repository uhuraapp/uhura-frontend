App.EpisodeListItemComponent = Ember.Component.extend({
  layoutName: "component/episode-list-item",
  click: function(e){
    element  = $(e.toElement)
    if(element.is(".listened")) {
      App.PLAYER.listened(this.episode);
    }
  }
});
