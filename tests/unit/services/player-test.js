import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';

var application;

moduleFor('service:player', 'Unit | Service | player', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});


test('play/pause a episode', function (assert) {
  var episode = Ember.Object.create(server.create('episode'));

  var service = this.subject();
  service.playpause(episode);
  assert.equal(episode.get('playing'), true, 'set episode to playing');
  assert.equal(service.get('playing'), true, 'set player status to playing');

  service.playpause(episode);
  assert.equal(episode.get('playing'), false, 'set episode to not playing');
  assert.equal(service.get('playing'), false, 'set player status to not playing');

  assert.equal(service.get('current'), episode, 'save current playing episode');

  episode.set('playing', true);

  var newEpisode = Ember.Object.create(server.create('episode'));

  service.playpause(newEpisode);
  assert.equal(episode.get('playing'), false, 'stop old episode');
  assert.equal(newEpisode.get('playing'), true, 'set new episode to playing');
  assert.equal(service.get('playing'), true, 'set player status to playing');
});
