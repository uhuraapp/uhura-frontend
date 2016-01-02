import Ember from 'ember';

export function shortText(params/*, hash*/) {
  const [ text, maxSize ] = params;
  let _shortText = text.substring(0, maxSize);
  if (text.length > _shortText.length) {
    _shortText += '...';
  }
  return _shortText;
}

export default Ember.Helper.helper(shortText);
