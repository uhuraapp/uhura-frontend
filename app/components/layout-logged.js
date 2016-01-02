import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

const { inject: { service }, computed: { alias } } = Ember;

export default Ember.Component.extend(InvalidateSessionMixin, {
  session: service('session'),
  classNames: ['mdl-layout', 'mdl-js-layout'],
  classNameBindings: ['hasDrawer:mdl-layout--fixed-drawer', 'hasDrawer:mdl-layout--fixed-header', 'hasDrawer:mdl-layout--overlay-drawer-button'],
  hasDrawer: alias('session.isAuthenticated')
});
