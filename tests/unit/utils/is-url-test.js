import isUrl from '../../../utils/is-url';
import { module, test } from 'qunit';

module('isUrl');

test('it works', function(assert) {
  var result = isUrl('http://google.com');
  assert.ok(result);
});
