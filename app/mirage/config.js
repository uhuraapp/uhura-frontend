export default function() {
  var oldcheckPassthrough = this.pretender.checkPassthrough;
  this.pretender.checkPassthrough = function (request) {
    request.url = parseURL(request.url).fullpath;
    return oldcheckPassthrough.apply(this, [request]);
  };

  this.namespace = '/v2';


  this.get('/channels/:id', ['channel', 'episodes']);
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
