var duration = 300;

export default function(){
  this.transition(
    this.fromRoute('subscriptions'),
    this.toRoute('channel'),
    this.use('explode', {
      matchBy: 'data-channel-image-id',
      use: ['flyTo', { duration } ]
    }
    , {
      use: ['toLeft', { duration } ]
    }),
    this.reverse('explode', {
      matchBy: 'data-channel-image-id',
      use: ['flyTo', { duration } ]
    }, {
      use: ['toRight', { duration } ]
    })
  );
}
