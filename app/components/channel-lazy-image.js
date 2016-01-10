import Ember from 'ember';

const { computed, isEmpty } = Ember;

const IMAGE_HOST = 'https://images$x$.uhura.io';
const DEFAULT_IMAGE = '/assets/channel-placeholder.png';

export default Ember.Component.extend({
  tagName: 'img',
  classNames: ['channel-img'],
  attributeBindings: 'src',
  imageURL: false,

  src: computed('imageURL', function() {
    return this.get('imageURL') || DEFAULT_IMAGE;
  }),

  didInsertElement() {
    const that = this;
    let image = new Image();
    image.src = this.get('cachedImageSource');
    image.onload = function() {
      if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth !== 0) {
        Ember.run(() => {
          if (!that.get('isDestroyed')) {
            that.set('imageURL', this.src);
          }
        });
      }
    };
  },

  cache(imageURL) {
    if(imageURL.includes('arcane-forest-5063')) {
      return
    }

    const hostIndex = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    const imageHost = IMAGE_HOST.replace('$x$', hostIndex);

    const image = new Image()
    image.src = `${imageHost}/resolve?url=${imageURL}`;
  },

  cachedImageSource: computed('channel.imageURL', 'channel.image_url', function() {
    const imageURL = this.get('channel.imageURL') || this.get('channel.image_url');

    if (isEmpty(imageURL.trim())) {
      return DEFAULT_IMAGE;
    }

    const isCached = imageURL.indexOf('.uhura.io') !== -1;
    if (isCached) {
      return imageURL;
    }

    this.cache(imageURL);

    return imageURL;
  })
});
