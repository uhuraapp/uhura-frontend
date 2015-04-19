import DS from 'ember-data';


var imageResizedURL = function(imageURL) {
  var size, imageWidth, windowWidth = window.screen.width, resizeServer = "http://uhura-img.herokuapp.com";

  if(windowWidth < 401) {
    imageWidth = "400";
  } else if(windowWidth < 701) {
    imageWidth = "900";
  } else if(windowWidth < 901) {
    imageWidth = "900";
  } else  if(windowWidth > 900) {
    return imageURL;
  }

  size = imageWidth + "/" + imageWidth;
  return resizeServer + "/" + encodeURIComponent(imageURL) + "/" + size;
};

export default DS.Model.extend({
  name: DS.attr(),
  uri: DS.attr(),
  channels: DS.hasMany('channel'),
});
