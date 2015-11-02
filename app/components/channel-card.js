import Ember from 'ember';

export default Ember.LinkComponent.extend({
  positionalParams: 'channel',
  layout: null,
  classNames: ['channel-link-card'],

  didReceiveAttrs() {
    this.attrs.params = ['channel', this.get('channel').id];
    this.attrs.hasBlock = true;
  },

  didInsertElement() {
    const $card = this.$();

    $card.find('img').hover(() => {
      const el = this.__createCardInfo($card);
      el.addClass('showin');
      el.fadeIn();
      Ember.$('body').append(el);
      this.__fixBottom(el);
    }, (event) => {
      if (this.__shouldNotRemoveCardInfo(event)) {
        Ember.$(event.relatedTarget).hover(() => {}, this.__hideCardInfo);
        return;
      }

      this.__hideCardInfo();
    });
  },

  __createCardInfo($card) {
    const info = $card.find('.channel-card__info');
    const el = info.clone();
    const elRect = $card[0].getBoundingClientRect();
    const { top, left, width }  = elRect;
    el.css({ top, left, width });
    return el;
  },

  __fixBottom(el) {
    const { top, bottom } = el[0].getBoundingClientRect();
    if (bottom > window.innerHeight) {
      const diff = bottom - window.innerHeight + 15;
      el.css({
        top: top - diff
      });
    }
  },

  __shouldNotRemoveCardInfo(event) {
    const target             = Ember.$(event.relatedTarget);
    const cardInfoClass      = '.channel-card__info';
    const isCardInfo         = target.is(cardInfoClass);
    const isCardInfoChildren = target.parents(cardInfoClass).length > 0;
    return isCardInfo || isCardInfoChildren;
  },

  __hideCardInfo() {
    Ember.$('.showin.channel-card__info').fadeOut();
  },

  willDestroyElement() {
    this.$().off('mouseenter mouseleave');
  }
});
