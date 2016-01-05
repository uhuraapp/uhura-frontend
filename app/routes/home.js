import Ember from 'ember';
import ENV from '../config/environment';

const { inject: { service }, RSVP: { hash } } = Ember;

export default Ember.Route.extend({
  client: service('uhura-client'),
  store: service('store'),

  beforeModel() {
    if(ENV.platform === 'electron') {
      this.transitionTo('login');
    }
  },

  model() {
    return hash({
      channels: this.get('client').request('', 'top', 'channels').then((data) => data.channels),
      episodes: this.buildEpisodes()
    });
  },

  buildEpisodes() {
    return [
      {
        id: 86373,
        title: 'The Living Room From Love Radio',
        channel_id: 'loveradio',
        description: 'Diane\'s new neighbors across the way never shut their curtains, and that was the beginning of an intimate, but very one-sided relationship.'
      },
      {
        id: 465197,
        title: 'How to Become Batman From Invisibilia',
        channel_id: 'invisibilia' ,
        description: 'In "How to Become Batman," Alix and Lulu examine the surprising effect that our expectations can have on the people around us. You\'ll hear how people\'s expectations can influence how well a rat runs a maze. Plus, the story of a man who is blind and says expectations have helped him see. Yes. See. This journey is not without skeptics.'
      }
    ];
  }
});
