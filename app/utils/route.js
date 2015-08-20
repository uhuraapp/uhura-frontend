import Ember from 'ember';

export default function route() {
  Ember.Route.reopen({
    activate() {
      let cssClass = this.cssClass();
      Ember.$('body').addClass(cssClass);
      window.scrollTo(0, 0);
    },
    deactivate() {
      Ember.$('body').removeClass(this.cssClass());
    },
    cssClass() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
  return true;
}
