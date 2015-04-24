import Ember from 'ember';
import LazyImageViewMixin from '../mixins/lazy-image-view-mixin';

export default Ember.View.extend(LazyImageViewMixin, {
  scrollToProfile: function () {
    Ember.run.scheduleOnce("afterRender", ()=> { setTimeout( ()=> { window.scrollTo(0, 100); }, 1000); });
  }.on('didInsertElement'),

  modelDidChanged: function () {
    // this.container.lookup('controller:application').send('closeMenu');
  }.observes('controller.model').on('didInsertElement')
});
