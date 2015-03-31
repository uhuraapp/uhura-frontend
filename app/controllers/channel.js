/* global $ */
import Ember from 'ember';

export default Ember.ObjectController.extend({
 removeListened: true,

 lastEpisodes: [],

 episodesFiltered: function(){
    var removeListened = this.get('removeListened');
    var episodes = this.get('model.episodes').sortBy('published_at').reverse();

    return episodes.filter( (episode) => {
      return !(removeListened && episode.get('listened'));
    });
  }.property('model.episodes.@each', 'removeListened'),

  actions: {
    markAllAsListened: function () {
      var i, episodes = this.get('episodesFiltered');
      for(i = 0; i < episodes.length; i++) {
        $(".listened[data-id='" + episodes[i].id + "'][data-listened=false]").trigger('click');
      }
    }
  }
});
