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

  didUpdateAttrs() {
    this.updateImage();
  },

  didReceiveAttrs() {
    this.updateImage();
  },

  updateImage() {
    const that = this;

    let image = new Image();
    image.src = this.cachedImageSource();
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
    // Old cached url domain
    if (imageURL.indexOf('arcane-forest-5063') > -1) {
      return;
    }

    const hostIndex = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
    const imageHost = IMAGE_HOST.replace('$x$', hostIndex);

    const image = new Image();
    image.src = `${imageHost}/resolve?url=${imageURL}`;
  },

  channelImage() {
    return this.get('channel.content.image_url') ||
        this.get('channel.imageURL') ||
        this.get('channel.image_url') || '';
  },

  cachedImageSource() {
    const imageURL = this.channelImage();

    if (isEmpty(imageURL.trim())) {
      return DEFAULT_IMAGE;
    }

    const isCached = imageURL.indexOf('.uhura.io') !== -1;
    if (isCached) {
      return imageURL;
    }

    this.cache(imageURL);

    return imageURL;
  }
});
