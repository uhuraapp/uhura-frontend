export default function() {
  let oldcheckPassthrough = this.pretender.checkPassthrough;
  this.pretender.checkPassthrough = function(request) {
    request.url = parseURL(request.url).fullpath;
    return oldcheckPassthrough.apply(this, [request]);
  };

  this.namespace = '/v2';

  this.get('/channels/:id', function(db, request) {
    let { id } = request.params;
    let channel = db.channels.find(id);
    let episodes = db.episodes.where({ channel_id: id });
    channel.episodes = episodes.mapBy('id');

    return {
      channel,
      episodes
    };
  });

  this.get('/episodes', function() {
    return {
      episodes: []
    };
  });

  this.put('/episodes/:id/listen', function() {
    return {};
  });
}

function parseURL(url) {
  let anchor = document.createElement('a');
  anchor.href = url;
  anchor.fullpath = anchor.pathname + (anchor.search || '') + (anchor.hash || '');
  return anchor;
}

/*
export function testConfig() {
}
*/
