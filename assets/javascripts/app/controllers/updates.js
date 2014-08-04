App.UpdatesController = Ember.ObjectController.extend({
  content: function(){
    $.ajax({
        type: 'GET',
        url : 'http://api.tumblr.com/v2/blog/uhuraapp.tumblr.com/posts/text',
        dataType: 'jsonp',
        data: {
            api_key : 'JM9XZSfUxhci4w3eNIU4ceHWpAZ7hzfdmZ0ryf1kmqouV5bFV7',
            jsonp :   'App.UpdatesController.update',
            limit: 5
        }
    });

    return {statuses: []};
  }.property(),
  update: function(data) {
    var statuses = data.response.posts;
    if (statuses.length > 0) {
      this.set('statuses', statuses);
      $('.updates').fadeIn();
      window.setTimeout(function(){
        $('.updates .statuses').slick({
          autoplay: true,
          autoplaySpeed: 5000,
          dots: true,
          arrows: false
        });
      }, 2000);
    }
  },
  actions: {
    open: function (update) {
      if ((old = $('.updates #update-modal')).length > 0) {
        $('body').append(old);
        $('.updates #update-modal').remove();
      }

      var modal = $.UIkit.modal('#update-modal'),
      title = $('.js-modal__title'),
      content = $('.js-modal__content');

      title.text('').text(update.title);
      content.html('').html(update.body);
      modal.show();

      mixpanel.track("update_opened");
    }
  }
}).create();
