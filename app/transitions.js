const duration = 450;

export default function() {
  this.transition(
    this.fromRoute('subscriptions'),
    this.toRoute('channel'),
    this.use('explode', {
      matchBy: 'data-channel-image-id',
      use: ['flyTo', { duration } ]
    })
  );

  this.transition(
    this.fromRoute('channel'),
    this.toRoute('subscriptions'),
    this.use('explode', {
      matchBy: 'data-channel-image-id',
      use: ['flyTo', { duration } ]
    })
  );

  this.transition(
    this.hasClass('share-dialog'),
    this.toValue(true),
    this.use('crossFade', { duration }),
    this.reverse('toLeft', { duration })
  );
}
