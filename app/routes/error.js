import Ember from 'ember';
import TitledMixin from '../mixins/routes/titled';

const { set, computed } = Ember;

export default Ember.Route.extend(TitledMixin, {
  shouldSetTitle: computed(() => false),
  setupController(controller, adapterError) {
    const { title, details } = this.__error(adapterError.message || adapterError.errors);
    set(controller, 'title', title);
    set(controller, 'details', `For some reason we can not complete your request,
        We are receiving the follow error: <strong>${details}</strong>.</br /><br />
        We were notified of the problem and soon we will fix it, <strong>try reloading the page</strong>, if the problem persists please email support@uhura.io`);
    this._super(controller, adapterError);
  },

  __error(errors) {
    let title = 'We\'re sorry';
    let details = errors;

    if (errors && errors.length === 1) {
      const [ error ] = errors;
      details = error.title;
    }

    return { title, details };
  }
});
