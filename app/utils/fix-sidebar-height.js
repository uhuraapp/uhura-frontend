/* global $ */
export default function fixSidebarHeight() {
  'use strict';
  $('body').css('min-height', window.innerHeight + 'px');
  $('#profile, #content').css('min-height', window.innerHeight + 'px');
}
