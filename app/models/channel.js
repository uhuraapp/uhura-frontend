import DS from 'ember-data';

var IMAGE_HOST = "http://arcane-forest-5063.herokuapp.com";

export default DS.Model.extend({
  title: DS.attr('string'),
  image_url: DS.attr('string'),
  description: DS.attr('string'),
  copyrigth: DS.attr('string'),
  episodes: DS.hasMany('episode'),
  raw_id: DS.attr('string'),
  subscribed: DS.attr(),
  to_view: DS.attr(),
  imageURL: function () {
    var url = this.get('image_url');
    if(url !== "" && url.indexOf(IMAGE_HOST) === -1) {
      return IMAGE_HOST + "/resolve?url=" + this.get('image_url');
    }
    return url;
  }.property('image_url')
});
