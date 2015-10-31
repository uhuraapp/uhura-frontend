import DS from 'ember-data';
import Ember from 'ember';

const { isEmpty, computed } = Ember;

export default DS.Model.extend({
  hasKey: computed('key', function() {
    return !isEmpty(this.get('id'));
  })
});
