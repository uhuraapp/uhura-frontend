export function initialize(container, application) {
  application.inject('route', 'filesystem', 'service:filesystem');
  application.inject('controller', 'filesystem', 'service:filesystem');
}

export default {
  name: 'filesystem-service',
  initialize
};
