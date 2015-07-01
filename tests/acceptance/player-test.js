import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'uhuraapp/tests/helpers/start-app';

var application,
    channel,
    episodes;

module('Acceptance | episode', {
  beforeEach: function() {
    application = startApp();

    window.oldM = window.MediaElementPlayer;
    window.MediaElementPlayer = (function () {
      function MediaElementPlayer(argument) {}
      MediaElementPlayer.prototype.play = () => {};
      MediaElementPlayer.prototype.pause = () => {};
      return MediaElementPlayer;
    })();

    channel = server.create('channel');
    episodes = server.createList('episode', 10, {channel_id: channel.id});
  },

  afterEach: function() {
    window.MediaElementPlayer = window.oldM;
    Ember.run(application, 'destroy');
  }
});

test('player | show episode on player container', function(assert) {
  visit(`/channels/${channel.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/channels/${channel.id}`);
  });

  click('.episode:first-child .playpause');

  andThen(function () {
    assert.equal(find("#player .channel-title").text(), channel.title);
    assert.equal(find("#player .title").text(), episodes[0].title);
    assert.ok(find(".player-wrapper").hasClass('has-model'));
  });
});

test('player | have player element', function(assert) {
  visit(`/channels/${channel.id}`);

  andThen(function() {
    assert.equal(currentURL(), `/channels/${channel.id}`);
  });

  click('.episode:first-child .playpause');

  andThen(function () {
    assert.equal(find("#wrapper-audio-element audio").length, 1);
    assert.equal(find("#wrapper-audio-element audio").attr('src'), episodes[0].source_url);
  });
});
