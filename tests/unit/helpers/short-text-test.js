import { shortText } from '../../../helpers/short-text';
import { module, test } from 'qunit';

module('Unit | Helper | short text');

test('it works', function(assert) {
  const result = shortText(['Lorem ipsum dolor sit amet', 5]);

  assert.equal(result, 'Lorem...');

  assert.equal(shortText(['Ola', 10]), 'Ola');
  assert.equal(shortText([null, 10]), '');
});
