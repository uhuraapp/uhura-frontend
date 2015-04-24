import Ember from 'ember';
import LazyImageViewMixin from '../mixins/lazy-image-view-mixin';


export default Ember.View.extend(LazyImageViewMixin, {
  resultsChanges: function () {
    Ember.run.scheduleOnce("afterRender", this.loadLazyImages);
  }.observes('controller.results')
});
