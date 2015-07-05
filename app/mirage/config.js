export default function() {
  var oldcheckPassthrough = this.pretender.checkPassthrough;
  this.pretender.checkPassthrough = function (request) {
    request.url = parseURL(request.url).fullpath;
    return oldcheckPassthrough.apply(this, [request]);
  };

  this.namespace = '/v2';

  this.get('/channels/:id', function (db, request) {
    var id = request.params.id;
    var channel = db.channels.find(id);
    var episodes = db.episodes.where({channel_id: id});
    channel.episodes = episodes.mapProperty('id');

    return {
      channel: channel,
      episodes: episodes,
    };
  });
  this.get('/episodes', function () {
    return {
      episodes: []
    };
  });

  this.put('/episodes/:id/listen', function () {
    return {};
  });
}

function parseURL(url) {
  var anchor = document.createElement('a');
  anchor.href = url;
  anchor.fullpath = anchor.pathname + (anchor.search || '') + (anchor.hash || '');
  return anchor;
}

/*
export function testConfig() {
}
*/
