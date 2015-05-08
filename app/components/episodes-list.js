/* global moment */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['episodes'],
  tagName: 'ul',
  hasMore: true,
  page: 1,
  infiniteScroll: true,
  hasShare: true,
  actions: {
    fetchMore: function(callback) {
      var promise = Ember.RSVP.Promise.reject();

      if(this.get('infiniteScroll')) {
        var episodes = this.get('episodes'),
            lastEpisode = (episodes.currentState ? episodes.currentState : episodes)[ episodes.length - 1 ];

        var date = lastEpisode ? lastEpisode.get('published_at') : 1999;
        var since = moment.utc(date).format();

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
