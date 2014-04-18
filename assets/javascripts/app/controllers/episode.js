App.EpisodeRoute = Ember.Route.extend({
  model: function (params) {
    'use strict';
    return this.store.find('episode', params.episode_id);
  },
  activate: function(){
    var title = this.modelFor('episode').get('title')

    $(document).attr('title', title);
    $("[property='og:title']").attr('content', title)
  }
})
