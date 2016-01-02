import Ember from 'ember';
import InvalidateSessionMixin from '../mixins/invalidate-session-mixin';

const { inject: { service }, computed } = Ember;

export default Ember.Component.extend(InvalidateSessionMixin, {
  session: service('session'),
  pageTitle: service('page-title-list'),
  classNames: ['mdl-layout', 'mdl-js-layout'],
  classNameBindings: ['hasDrawer:mdl-layout--fixed-drawer', 'hasDrawer:mdl-layout--fixed-header', 'hasDrawer:mdl-layout--overlay-drawer-button'],
  hasDrawer: computed.alias('session.isAuthenticated'),
  title: computed('pageTitle.length', function pageTitle() {
    const [ { title } ] = this.get('pageTitle.sortedTokens');
    return title;
  })
});
