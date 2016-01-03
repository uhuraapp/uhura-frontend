import Ember from 'ember';

const { inject: { service }, computed } = Ember;

export default Ember.Service.extend({
  client: service('uhura-client'),

  searchValue: null,
  searchResults: [],
  resultsEmpty: false,

  noResults: computed('resultsEmpty', 'searchValue', function() {
    if (this.get('resultsEmpty') && Ember.isPresent(this.get('searchValue')) && this.get('searchValue').length > 0) {
      return true;
    } else {
      return false;
    }
  }),

  results: computed.alias('searchResults'),

  _fetchSearchResults: Ember.observer('searchValue', function() {
    if (Ember.isBlank(this.get('searchValue'))) {
      this.set('searchResults', []);
      this.set('resultsEmpty', true);
      return;
    }

    this.set('searching', true);

    const data = { q: this.get('searchValue') };

    Ember.run(() => {
      this.get('client').request('channels', null, null, 'GET', { data })
      .then((data) => {
        this.set('searching', false);
        const results = data.channels;
        this.set('resultsEmpty', results.get('length') === 0);
        this.set('searchResults', results);
      });
    });
  })
});
