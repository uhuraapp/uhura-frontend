import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  title: computed('model.id', function() {
    const id = this.get('model.id');
    return `Subscription Lists #${id}`;
  })
});
