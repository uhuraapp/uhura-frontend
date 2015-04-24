/* global moment */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['episodes'],
  tagName: 'ul',
  hasMore: true,
  page: 1,
  actions: {
    fetchMore: function(callback) {
      var episodes = this.get('episodes'),
        promise = Promise.resolve(),
        lastEpisode = (episodes.currentState ? episodes.currentState : episodes)[ episodes.length - 1 ];

      if(lastEpisode) {
        var since = moment.utc(lastEpisode.get('published_at')).format();

        // TODO: use meta
        promise = this.store.find("episode", {
          since: since,
          channel_id: this.get('channel.raw_id'),
          per_page: 20
        });
      }

      callback(promise);
    }
  }
});
