import Ember from 'ember';

const { isEmpty, RSVP: { Promise } } = Ember;

export default Ember.Route.extend({
  client: Ember.inject.service('uhura-client'),

  queryParams: {
    q: {
      refreshModel: true
    }
  },

  model(params) {
    return Ember.RSVP.hash({
      categories: this.store.findAll('category')
        .then((data) => data.sortBy('channelsLength'))
        .then((data) => data.reverse()),
      channels: this.searchChannel(params.q)
    });
  },

  searchChannel(q) {
    if (isEmpty(q)) {
      return Promise.resolve([]);
    }

    const data = { q };
    return this.get('client').request('channels', null, null, 'GET', { data })
      .then((data) => data.channels);
  },

  actions: {
    search() {
      const q = this.get('controller.termSearch');
      this.searchChannel(q).then((channels) => this.get('controller.model.channels', channels));
    }
  }
});
