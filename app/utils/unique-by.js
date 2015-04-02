export default function uniqueBy(by, array) {
  var o = {}, i, l = array.length, r = [];
  for(i=0; i<l;i+=1){ o[array[i][by]] = array[i]; }
  for(i in o){ r.push(o[i]); }
  return r;
}
