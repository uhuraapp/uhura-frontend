import Ember from 'ember';

export default Ember.View.extend({
  grid: function () {
    UIkit.grid($('#categories'), {gutter: 30});
  }.on("didInsertElement")
});
