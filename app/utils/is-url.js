var pattern = /(((?:https?|ftp):\/\/)?[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;

export default function isUrl(url) {
  return !!url.match(pattern);
}
