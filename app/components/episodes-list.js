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
        let episodes = this.get('episodes');
        let lastEpisode = episodes.get('lastObject');
        let date = lastEpisode ? lastEpisode.get('published_at') : 1999;
        let since = moment.utc(date).format();

        // TODO: use meta
        promise = this.get('store').query('episode', {
          since,
          channel_id: this.get('channel.raw_id'),
          per_page:   20
        }).then(function(response) {
          // Fix error with _internalModel
          let items = []
          response.get('content').forEach(function(internalModel) {
            items.push({_internalModel: internalModel});
          });
          response.set('content', items);
          return response;
        });

      }

      callback(promise);
    }
  }
});
