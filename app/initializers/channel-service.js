export function initialize(container, application) {
  application.inject('route', 'channelService', 'service:channel');
}

export default {
  name: 'channel-service',
  initialize: initialize
};
