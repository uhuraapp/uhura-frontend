/* global moment */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['episodes'],
  tagName: 'ul',
  hasMore: true,
  page: 1,
  infiniteScroll: true,
  hasRightActions: true,
  actions: {
    fetchMore(callback) {
      let promise = Ember.RSVP.Promise.reject();

      if (this.get('infiniteScroll')) {
        let episodes = this.get('episodes'),
            lastEpisode = (episodes.currentState ? episodes.currentState : episodes)[ episodes.length - 1 ];

        let date = lastEpisode ? lastEpisode.get('published_at') : 1999;
        let since = moment.utc(date).format();

        // TODO: use meta
        promise = this.get('store').find('episode', {
          since,
          channel_id: this.get('channel.raw_id'),
          per_page:   20
        });
      }

      callback(promise);
    }
  }
});
