const pattern = /(((?:https?|ftp):\/\/)?).+\..*/gi;

export default function isUrl(url) {
  return !!url.match(pattern);
}
