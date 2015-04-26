import Ember from 'ember';

export default function route() {
  Ember.Route.reopen({
    activate: function() {
      var cssClass = this.cssClass();
      Ember.$('body').addClass(cssClass);
      window.scrollTo(0, 0);
    },
    deactivate: function() {
      Ember.$('body').removeClass(this.cssClass());
    },
    cssClass: function() {
      return this.routeName.replace(/\./g, '-').dasherize();
    }
  });
}
