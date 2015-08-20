export function initialize(container, application) {
  application.inject('controller', 'lunr', 'service:lunr');
  application.inject('route', 'lunr', 'service:lunr');
}

export default {
  name: 'lunr',
  initialize
};
