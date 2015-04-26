/* global Layzr */
import Ember from 'ember';

export default Ember.Mixin.create({
  lazyImages: function () {
    Ember.run.scheduleOnce("afterRender", () => { this.loadLazyImages(); });
  }.on("didInsertElement"),

  __check: function (img) {
    if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
      img.setAttribute("src", img.getAttribute('data-fallback'));
    }
    this.lazyImageCallback();
  },

  lazyImageCallback: function () {},
  loadLazyImages: function () {
    var __this = this;
    new Layzr({
      selector: '[data-layzr]',
      callback: function () {
        if (!this.complete) {
          this.onload = this.onerror = function () {
            __this.__check(this);
          };
        }
        else { __this.__check(this); }
      }
    });
  }
});
