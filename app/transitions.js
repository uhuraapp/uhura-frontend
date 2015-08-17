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

  this.transition(
    this.hasClass('share-dialog'),
    this.toValue(true),
    this.use('crossFade', {duration}),
    this.reverse('toLeft', {duration})
  );
}
