import Ember from 'ember';

export default Ember.Mixin.create({
  lazyImages: function () {
    Ember.run.scheduleOnce("afterRender", this.loadLazyImages);
  }.on("didInsertElement"),

  loadLazyImages: function () {
    var check = function (img) {
      if (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0) {
        img.setAttribute("src", img.getAttribute('data-fallback'))
      }
    };

    var layzr = new Layzr({
      selector: '[data-layzr]',
      callback: function (node) {
        if (!this.complete) {  this.onload = this.onerror = function () { check(this); }; }
        else { check(this); }
      }
    });
  }
});
