import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';
import sinon from 'sinon';

const { stub } = sinon;

let application;
let mediaMock;
let tracker;

moduleFor('service:player', 'Unit | Service | player', {
  needs: ['adapter:application', 'service:uhura-client'],

  beforeEach() {
    application = startApp();
    window.oldM = window.MediaElementPlayer;
    window.oldAlert = window.alert;
    tracker = stub(window.ahoy, 'track');
    window.alert = function() {};
    mediaMock = function(_name) {
      return {
        addEventListener(name, fn) {
          if (name === _name) {
            fn();
          }
        }
      };
    };
  },

  afterEach() {
    window.ahoy.track.restore();
    Ember.run(application, 'destroy');
    window.MediaElementPlayer = window.oldM;
    window.alert = window.oldAlert;
  }
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('play/pause a episode', function(assert) {
  window.MediaElementPlayer = (function() {
    function MediaElementPlayer() {
    }

    MediaElementPlayer.prototype.play = function() {};
    MediaElementPlayer.prototype.pause = function() {};

    return MediaElementPlayer;
  })();

  let episode = Ember.Object.create(server.create('episode'));

  let service = this.subject();
  service.playpause(episode);
  assert.equal(episode.get('playing'), true, 'set episode to playing');
  assert.equal(service.get('playing'), true, 'set player status to playing');
  assert.ok(tracker.calledWith('player', { action: 'play' }), 'track play');
  sinon.assert.callCount(tracker, 1);

  service.playpause(episode);
  assert.equal(episode.get('playing'), false, 'set episode to not playing');
  assert.equal(service.get('playing'), false, 'set player status to not playing');
  assert.ok(tracker.calledWith('player', { action: 'pause' }), 'track pause');
  sinon.assert.callCount(tracker, 2);

  assert.equal(service.get('current'), episode, 'save current playing episode');

  episode.set('playing', true);

  let newEpisode = Ember.Object.create(server.create('episode'));

  service.playpause(newEpisode);
  assert.equal(episode.get('playing'), false, 'stop old episode');
  assert.equal(newEpisode.get('playing'), true, 'set new episode to playing');
  assert.equal(service.get('playing'), true, 'set player status to playing');
});

test('create media element', function(assert) {
  assert.expect(7);

  let episode = Ember.Object.create(server.create('episode'));
  let service = this.subject();
  service.set('current', episode);

  service.successMedia = function() {
    assert.equal(this, service, 'should preserves the this on successMedia');
  };

  window.alert = function(msg) {
    assert.equal(msg, 'We can play the audio, make sure your browser can play audio/mp3 or if you have the flash 9.0.124 or silverlight 3.0 installed', 'should send message to user about error');
  };

  service._errorMedia = service.errorMedia;
  service.errorMedia = function() {
    assert.equal(this, service, 'should preserves the this on errorMedia');
    service._errorMedia();
  };

  window.MediaElementPlayer = (function() {
    function MediaElementPlayer(el, options) {
      assert.equal(el, '#element-player', 'get element');
      assert.deepEqual(options.features, ['current', 'duration', 'progress', 'volume'], 'has features');
      assert.equal(options.audioVolume, 'vertical', 'set audioVolume as vertical');
      options.success(); // call success callback
      options.error(); // call error callback
    }

    return MediaElementPlayer;
  })();

  Ember.run(function() {
    service.createMedia('#element-player');
  });

  let media = service.get('mediaPlayer');
  let mediaClassName = Object.getPrototypeOf(media).constructor.name;
  assert.equal(mediaClassName, 'MediaElementPlayer', 'set media');
});

test('stop', function(assert) {
  let service = this.subject();
  let episode = Ember.Object.create({ playing: true });
  service.set('current', episode);
  service.set('playing', false);

  service.stop();

  assert.ok(!service.get('playing'), 'set to not playing');
  assert.ok(!episode.get('playing'), 'set episode to not playing');
  assert.equal(service.get('current'), null, 'remove current episode');
  assert.ok(tracker.calledWith('player', { action: 'stop' }), 'track stop');
  sinon.assert.callCount(tracker, 1);
});

test('trackTime', function(assert) {
  assert.expect(28);

  let duration = 226;
  let service = this.subject();
  let episode = Ember.Object.create({ id: 1, stopped_at: 0, played: false });

  const promiseMock = function(fn) {
    return {
      then(resolve) {
        resolve();
        if (fn) {
          fn();
        }
        return promiseMock();
      }
    };
  };

  let currentTime = (time, fn, pingTime, endedTime) => {
    service.get('client').__request = service.get('client').request;

    service.get('client').request = function() {
      assert.equal(arguments[0], 'episode');
      assert.equal(arguments[1], episode.id);
      assert.equal(arguments[2], endedTime ? 'played' : 'listen');
      assert.equal(arguments[3], endedTime ? 'POST' : 'PUT');
      if (!endedTime) {
        assert.equal(arguments[4].data.at, time);
      }
      return promiseMock(fn);
    };

    service.set('current', episode);

    let media = mediaMock('timeupdate');
    media.currentTime = time;
    media.duration = duration;

    service.successMedia(media);

    if (!pingTime || !endedTime) {
      fn();
    }

    service.get('client').request = service.get('client').__request;
  };

  currentTime(5, function() {
    assert.equal(episode.get('stopped_at'), 5, 'changes stopped_at');
  }, true);

  currentTime(10, function() {
    assert.equal(episode.get('stopped_at'), 10, 'changes stopped_at');
  }, true);

  currentTime(10.4, function() {
    assert.equal(episode.get('stopped_at'), 10, 'changes stopped_at');
  }, true);

  currentTime(12, function() {
    assert.equal(episode.get('stopped_at'), 10, 'changes stopped_at');
  });

  currentTime(155, function() {
    assert.equal(episode.get('stopped_at'), 155, 'changes stopped_at');
  }, true);

  let nithyPercent = (duration * 95) / 100;
  currentTime(nithyPercent, function() {
    assert.equal(service.get('current.played'), true, 'in 95% mark as played');
  }, true, true);
});

test('starts from stopped_at', function(assert) {
  assert.expect(2);

  let service = this.subject();
  let media = mediaMock('loadeddata');
  let stoppedAt = 33;

  service.set('mediaPlayer', {
    setCurrentTime(time) {
      assert.equal(time, stoppedAt);
      assert.ok(tracker.calledWith('player', { action: 'loaded', time }), 'track loaded');
      sinon.assert.callCount(tracker, 1);
    }
  });
  service.set('current', Ember.Object.create({ stopped_at: stoppedAt }));
  service.successMedia(media);
});


test('autoplay tracker', function(assert) {
  let service = this.subject();
  service.set('autoplay', false);
  assert.ok(tracker.calledWith('player', { action: 'autoplay', enabled: false }), 'track autoplay false');

  service.set('autoplay', true);
  assert.ok(tracker.calledWith('player', { action: 'autoplay', enabled: true }), 'track autoplay true');
});

test('seek data tracker', function(assert) {
  let service = this.subject();
  let media = mediaMock('seeked');

  service.successMedia(media);
  assert.ok(tracker.calledWith('player', { action: 'seek' }), 'seek loaded');
  sinon.assert.callCount(tracker, 1);
});
