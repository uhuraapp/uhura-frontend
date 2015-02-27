export default function fixSidebarHeight() {
  'use strict';
  $('aside').css('height', window.innerHeight + 'px');
  $('#aside-wrapper').css('height', window.innerHeight + 'px');
}
