import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

const { inject: { service } } = Ember;

export default Ember.Component.extend(InvalidateSessionMixin, {
  session: service(),
  classNames: ['mdl-layout', 'mdl-js-layout', 'unlogged']
});
