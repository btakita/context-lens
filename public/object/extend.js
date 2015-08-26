function extend(obj) {
  var extenders = Array.prototype.slice.call(arguments, 1)
    , extendersLength = extenders.length;
  for (var extendersI = 0; extendersI < extendersLength; extendersI++) {
    var extender = extenders[extendersI];
    for (var i in extender) {
      if (extender.hasOwnProperty(i)) {
        obj[i] = extender[i];
      }
    }
  }
  return obj;
}
module.exports = extend;