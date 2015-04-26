import Ember from 'ember';
import LazyImageViewMixin from '../mixins/lazy-image-view-mixin';

export default Ember.View.extend(LazyImageViewMixin, {
  lazyImageCallback: function () {
    Ember.$.adaptiveBackground.run({
      normalizeTextColor: true,
      parent: "#profile"
    });
  },
  modelDidChanged: function () {
    // this.container.lookup('controller:application').send('closeMenu');
  }.observes('controller.model').on('didInsertElement')
});
