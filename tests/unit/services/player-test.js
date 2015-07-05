import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';

var application;
var mediaMock;
moduleFor('service:player', 'Unit | Service | player', {
  needs: ['adapter:application'],

  beforeEach: function() {
    application = startApp();
    window.oldM = window.MediaElementPlayer;
    window.oldAlert = window.alert;
    window.alert = function () {};
    mediaMock = function (_name) {
      return {
        addEventListener: function (name, fn) {
          if(name === _name){
            fn();
          }
        }
      };
    };
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    window.MediaElementPlayer = window.oldM;
    window.alert = window.oldAlert;
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('play/pause a episode', function (assert) {
  window.MediaElementPlayer = (function () {
    function MediaElementPlayer(argument) {
    }

    MediaElementPlayer.prototype.play = () => {};
    MediaElementPlayer.prototype.pause = () => {};

    return MediaElementPlayer;
  })();

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

test('create media element', function (assert) {
  assert.expect(7);

  let episode = Ember.Object.create(server.create('episode'));
  let service = this.subject();
  service.set('current', episode);

  service.successMedia = function () {
    assert.equal(this, service, 'should preserves the this on successMedia');
  };

  window.alert = function (msg) {
    assert.equal(msg, "We can play the audio, make sure your browser can play audio/mp3 or if you have the flash 9.0.124 or silverlight 3.0 installed", 'should send message to user about error');
  };

  service._errorMedia = service.errorMedia;
  service.errorMedia = function () {
    assert.equal(this, service, 'should preserves the this on errorMedia');
    service._errorMedia();
  };

  window.MediaElementPlayer = (function () {
    function MediaElementPlayer (el, options) {
      assert.equal(el, "#element-player", 'get element');
      assert.deepEqual(options.features, ['current', 'duration', 'progress', 'volume'], 'has features');
      assert.equal(options.audioVolume, 'vertical', 'set audioVolume as vertical');
      options.success(); // call success callback
      options.error(); // call error callback
    }

    return MediaElementPlayer;
  })();

  Ember.run(function () {
    service.createMedia("#element-player");
  });

  let media = service.get('media');
  let mediaClassName = Object.getPrototypeOf(media).constructor.name;
  assert.equal(mediaClassName, 'MediaElementPlayer', 'set media');
});

test('stop', function(assert) {
  let service = this.subject();
  let episode = Ember.Object.create({playing: true});
  service.set('current', episode);
  service.set('playing', false);

  service.stop();

  assert.ok(!service.get('playing'), 'set to not playing');
  assert.ok(!episode.get('playing'), 'set episode to not playing');
  assert.equal(service.get('current'), null, 'remove current episode');
});

test('trackTime', function(assert) {
  assert.expect(20);
  let duration = 200;

  let currentTime = (time, fn) => {
    let service = this.subject();
    let episode = Ember.Object.create({id: 1, stopped_at: 0, played: false});

    service.__request = service._request;
    service._request = function () {
      assert.equal(arguments[0], 'episode');
      assert.equal(arguments[1], episode.id);
      assert.equal(arguments[2], 'listen');
      assert.equal(arguments[3], 'PUT');
      assert.equal(arguments[4].data.at, time);
      return Ember.RSVP.Promise.resolve();
    };


    service.set('media', {currentTime: time, duration: duration});
    service.set('current', episode);

    let media = mediaMock('timeupdate');
    service.successMedia(media);

    service._request = service.__request;
  };

  currentTime(5, function (episode) {
    assert.equal(episode.get('stopped_at'), 5, 'changes stopped_at');
  });

  currentTime(12, function (episode) {
    assert.equal(episode.get('stopped_at'), 0, 'changes stopped_at');
  });

  currentTime(10, function (episode) {
    assert.equal(episode.get('stopped_at'), 10, 'changes stopped_at');
  });

  currentTime(155, function (episode) {
    assert.equal(episode.get('stopped_at'), 155, 'changes stopped_at');
  });

  currentTime(duration*95/100, function (service) {
    assert.equal(service.get('current.played'), true, 'in 95% mark as played');
  });
});
