App.EpisodeListItemComponent = Ember.Component.extend({
  layoutName: "component/episode-list-item",
  click: function(e){
    var element  = $(e.toElement);
    if(element.is("button.listened")) {
      App.PLAYER.listened(this.episode);
    }

    if (element.is("button.download")) {
      var url = "/api/episodes/" +this.episode.id + "/download";
      donwloadPage = window.open(url,'','');
    }
  }
});
