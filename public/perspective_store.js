var Store = require("./store")
  , RiotControl = require("riotcontrol");
function PerspectiveStore() {
  if (!(this instanceof PerspectiveStore)) return new PerspectiveStore();
  console.log("perspective_store");
  var self = this;
  function main() {
    console.log("perspective_store|main");
    Store.call(self, {
      loadStore: function() {
        dpd.perspectives.get(loadStoreGetEntities);
      }
    });
  }
  function loadStoreGetEntities(perspectives, err) {
    console.log("perspective_store/loadStoreGetEntities", JSON.stringify(perspectives));
    self.all(perspectives);
    RiotControl.trigger("perspectivesChanged", perspectives);
  }
  main();
}
module.exports = PerspectiveStore;
PerspectiveStore.instance = new PerspectiveStore();
RiotControl.addStore(PerspectiveStore.instance);
