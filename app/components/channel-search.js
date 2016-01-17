import Ember from 'ember';

const { inject: { service }, observer, isPresent } = Ember;

export default Ember.Component.extend({
  search: service(),
  query: null,

  didInitAttrs() {
    if (isPresent(this.attrs.query.value)) {
      this.queryDidChanged();
    }
  },

  queryDidChanged: observer('query', function() {
    Ember.run.debounce(this, function() {
      if (!this.get('isDestroyed') && !this.get('search.isDestroyed') && !this.get('search').isDestroyed) {
        if (this.get('query').length > 2) {
          this.set('search.searchValue', this.get('query'));
          window.ahoy.track('search', { query: this.get('query') });
        } else if (this.get('query').length === 0) {
          this.set('search.searchResults', []);
        }
      }
    }, 300);
  }),

  actions: {
    search() {
      this.set('search.searchValue', this.get('query'));
    }
  }
});
