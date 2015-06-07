/* global $ */
import Ember from 'ember';
import LazyImageViewMixin from '../mixins/lazy-image-view-mixin';

export default Ember.View.extend(LazyImageViewMixin, {
  lazyImageCallback: function () {

    $("#profile").fadeIn();
  },
  loadChannelImage: function () {
    Ember.run.later(this, function () {
      if(this.get('lazyIMG')) { this.get('lazyIMG').update(); }
    }, 200);
  }.observes('controller.model')
});
