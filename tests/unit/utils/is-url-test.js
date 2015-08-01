import isUrl from '../../../utils/is-url';
import { module, test } from 'qunit';

module('isUrl');

test('it works', function(assert) {
  let result = isUrl('http://google.com');
  assert.ok(result);
});
