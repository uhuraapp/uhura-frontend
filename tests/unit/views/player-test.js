import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

var view;
moduleFor('view:player', 'Unit | View | player', {
  beforeEach: function () {
    view = this.subject();
    view.append();
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  assert.ok(view);
  assert.ok(view.$().hasClass('player-wrapper'));

  Ember.run(function () {
    view.set('controller', {player: {current: true}});
  });
  assert.ok(view.$().hasClass('has-model'));
});
