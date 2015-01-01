import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['episodes'],
  tagName: 'ul',
  hasMore: true,
  page: 1,
  actions: {
    fetchMore: function(callback) {
      var episodes = this.get('episodes').content;

      var promise = this.get('store').find("episode", {
        since: episodes[ episodes.length - 1 ].get('published_at'),
        channel_id: this.get('channel.raw_id'),
        per_page: 20
      });

      callback(promise);
    }
  }
});
