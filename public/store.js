function Store(params) {
  console.log("store", params);
  riot.observable(this);
  var params2 = params || {}
    , self = this;
  self.on("loadStore", function() {
    var isInstance = !arguments.length || !!(Array.prototype.some.call(arguments, function(arg) {
      return self instanceof arg;
    }));
    console.log("store|loadStore");
    if (isInstance) {
      params2.loadStore && params2.loadStore();
    }
  });
}
module.exports = Store;