import {
  t
} from 'uhuraapp/helpers/t';

module('THelper');

test('default en', function() {
  $.removeCookie("language");
  equal(t("footer.follow_us"), "Follow Us");
});


test('returns pt', function() {
  $.cookie("language", "pt");
  equal(t("footer.follow_us"), "Siga-nos no");
});
