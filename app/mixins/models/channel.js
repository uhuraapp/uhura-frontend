import DS from 'ember-data';
import Ember from 'ember';

let { computed } = Ember;

const IMAGE_HOST = 'https://images$x$.uhura.io';

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
          if (!that.isDestroyed) {
            that.set('imageURL', this.src);
          }
        });
      }
    };

    return '/assets/channel-placeholder.png';
  }),

  _realImageUrl() {
    let url = this.get('image_url');
    if (url !== '' && url.indexOf('.uhura.io') === -1) {
      const imageHostIndex = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
      const imageHost = IMAGE_HOST.replace('$x$', imageHostIndex);
      return `${imageHost}/resolve?url=${this.get('image_url')}`;
    }
    return url;
  }
});
