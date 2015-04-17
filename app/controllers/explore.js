import Ember from 'ember';
import isURL from '../utils/is-url';

export default Ember.Controller.extend({
  actions: {
    search: function () {
      if(isURL(this.q)) {
        this.transitionToRoute('channel_by_url', {url: this.q})
      } else {
        console.log("search")
      }
    }
  }
});
