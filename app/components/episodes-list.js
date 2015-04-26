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
        promise = Ember.RSVP.Promise.resolve(),
        lastEpisode = (episodes.currentState ? episodes.currentState : episodes)[ episodes.length - 1 ],
        since;

      if(lastEpisode) {
        since = moment.utc(lastEpisode.get('published_at')).format();
      } else {
        since = moment.utc(1999);
      }

      // TODO: use meta
      promise = this.store.find("episode", {
        since: since,
        channel_id: this.get('channel.raw_id'),
        per_page: 20
      });

      callback(promise);
    }
  }
});
