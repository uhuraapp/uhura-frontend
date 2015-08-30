import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';

let application,
    channel,
    episodes,
    mediaMock;

module('Acceptance | player a episode', {
  beforeEach() {
    application = startApp();

    window.oldM = window.MediaElementPlayer;
    window.MediaElementPlayer = (function() {
      function MediaElementPlayer() {}
      MediaElementPlayer.prototype.play = function() { };
      MediaElementPlayer.prototype.pause = function() { };
      return MediaElementPlayer;
    })();
    mediaMock = function(_name) {
      return {
        addEventListener(name, fn) {
          if (name === _name) {
            fn();
          }
        }
      };
    };
    channel = server.create('channel');
    episodes = server.createList('episode', 10, { channel_id: channel.id });
  },

  afterEach() {
    window.MediaElementPlayer = window.oldM;
    Ember.run(application, 'destroy');
  }
});

test('player | show episode on player container', function(assert) {
  visit(`/channels/${channel.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/channels/${channel.id}`, 'check if is on channel page');
  });

  click('.episode:first-child .playpause');

  andThen(function() {
    assert.equal(find('#player .channel-title').text(), channel.title, 'check if channel title is on player');
    assert.equal(find('#player .title').text(), episodes[0].title, 'check if episode title is on player');
    assert.ok(find('.player-wrapper').hasClass('has-model'));
  });
});

test('player | have player element', function(assert) {
  visit(`/channels/${channel.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/channels/${channel.id}`);
  });

  click('.episode:first-child .playpause');

  andThen(function() {
    assert.equal(find('#wrapper-audio-element audio').length, 1);
    assert.equal(find('#wrapper-audio-element audio').attr('src'), episodes[0].source_url);
  });
});

test('player | when ended a episode should starts the next', function(assert) {
  const player = application.registry.container().lookup('service:player');

  visit(`/channels/${channel.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/channels/${channel.id}`);
    click('.episode:last .playpause');
  });

  andThen(function() {
    let i = episodes.length - 1;
    assert.equal(find('#player .title').text(), episodes[i].title);
    $('.episode:last').addClass('is-played');
    player.successMedia(mediaMock('ended'));
  });

  andThen(function() {
    let i = episodes.length - 2;
    assert.equal(find('#player .title').text(), episodes[i].title);
  });
});
