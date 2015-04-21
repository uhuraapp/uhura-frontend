import Ember from 'ember';

export default Ember.View.extend({
  grid: function () {
    UIkit.grid($('#categories'), {gutter: 30});
    Ember.run.scheduleOnce("afterRender", this.__loadLazyImages);
  }.on("didInsertElement"),

  resultsChanges: function () {
    Ember.run.scheduleOnce("afterRender", this.__loadLazyImages);
  }.observes('controller.results'),

  __loadLazyImages: function () {
    var layzr = new Layzr({
      selector: '[data-layzr]'
    });
  }
});
