import DS from 'ember-data';
import Ember from 'ember';

let { computed } = Ember;

const IMAGE_HOST = 'http://arcane-forest-5063.herokuapp.com';

export default Ember.Mixin.create({
  title: DS.attr('string'),
  image_url: DS.attr('string'),
  description: DS.attr('string'),
  copyrigth: DS.attr('string'),
  episodes: DS.hasMany('episode', { async: false }),
  raw_id: DS.attr('string'),
  subscribed: DS.attr(),
  to_view: DS.attr(),
  url:        DS.attr(),
  uri:        DS.attr(),
  channel_id: DS.attr(),
  channel_url: DS.attr(),
  imageURL: computed('image_url', function() {
    const that = this;
    let image = new Image();
    image.src = this._realImageUrl();
    image.onload = function() {
      if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth !== 0) {
        Ember.run(() => {
          that.set('imageURL', this.src);
        });
      }
    };

    return '/assets/channel-placeholder.png';
  }),

  _realImageUrl() {
    let url = this.get('image_url');
    if (url !== '' && url.indexOf(IMAGE_HOST) === -1) {
      return `${IMAGE_HOST}/resolve?url=${this.get('image_url')}`;
    }
    return url;
  }
});
