import Ember from 'ember';

export default Ember.ObjectController.extend({
 removeListened: true,

 lastEpisodes: [],

 episodesFiltered: function(){
    var removeListened = this.get('removeListened');
    var episodes = this.get('model.episodes');

    this.set('lastEpisodes', episodes);

    return episodes.filter( (episode) => {
      return !(removeListened && episode.get('listened'));
    });
  }.property('model.episodes.@each', 'removeListened'),

  actions: {
    markAllAsListened: function () {
      var i, episodes = this.get('model.episodes').content;
      for(i = 0; i < episodes.length; i++) {
        episodes[i].set ('listened', true);
      }
    }
  }
});
