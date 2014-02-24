// App.ChannelsController = Ember.ArrayController.extend({
//   actions: {
//     subscribeChannel: function(idParams) {
//       'use strict';
//       Uhura.Helpers.subscribeChannel(this, idParams)
//     },
//     newChannel: function(){
//       Uhura.Helpers.newChannel(this)
//     }
//   }
// });

// Uhura.ChannelController = Ember.ObjectController.extend({
//   episodes: (function() {
//     return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
//       sortProperties: ['published_at'],
//       sortAscending: false,
//       content: this.get('content.episodes')
//     });
//   }).property('content.episodes'),

//   actions: {
//     subscribeChannel: function(id) {
//       'use strict';
//       Uhura.Helpers.subscribeChannel(this, id)
//     },
//     listened: function(episode){
//       episode.set('listened', true)
//       Uhura.Helpers.listened(episode.id)
//     }
//   }
// });


App.DashboardController = Ember.ArrayController.extend({
  actions: {
    unsubscribe: function(idParams) {
      'use strict';
      App.Helpers.unsubscribeChannel(this, idParams);
    },
    newChannel: function(){
      App.Helpers.newChannel(this)
    }
  }
})

App.DashboardIndexController = Ember.ArrayController.extend({
  needs: "dashboard",
  actions: {
    listened: function(episode){
      App.Helpers.listened(episode.id)
    },
  }
})

App.DashboardChannelController = Ember.ArrayController.extend({
  content: [],
  actions: {
    listened: function(episode){
      App.Helpers.listened(episode.id)
    }
  }
})
