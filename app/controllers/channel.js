/* global $ */
import Ember from 'ember';

export default Ember.ObjectController.extend({
 removeListened: true,

 filterEpisodes: function(filter) {
   var episodes = this.get('model.episodes').sortBy('published_at').reverse();
   return episodes.filter(filter);
 },

 episodesFiltered: function(){
   var removeListened = this.get('removeListened');
   return this.filterEpisodes( (episode) => {
     return !(removeListened && episode.get('listened'));
   })
 }.property('model.episodes.@each.listened', 'removeListened'),

 showMarkAllAsListened: function () {
   return this.filterEpisodes( (episode) => {
     return !episode.get('listened');
   }).length > 0
 }.property('model.episodes.@each.listened'),

  actions: {
    markAllAsListened: function () {
      var i, episodes = this.get('episodesFiltered');
      for(i = 0; i < episodes.length; i++) {
        $(".listened[data-id='" + episodes[i].id + "'][data-listened=false]").trigger('click');
      }
    }
  }
});
