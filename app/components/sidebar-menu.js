import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

export default Ember.Component.extend(InvalidateSessionMixin, {
  classNames: ['mdl-layout__drawer']
});
