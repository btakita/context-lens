var Store = require("./store")
  , RiotControl = require("riotcontrol");
function PerspectiveStore() {
  if (!(this instanceof PerspectiveStore)) return new PerspectiveStore();
  console.log("perspective_store");
  var self = this
    , perspectives = [];
  function main() {
    console.log("perspective_store|main");
    Store.call(self, {
      loadStore: function() {
        dpd.perspectives.get(loadStoreGetEntities);
      }
    });
    self.all = all;
  }
  function loadStoreGetEntities(perspectives2, err) {
    console.log("perspective_store/loadStoreGetEntities", JSON.stringify(perspectives2));
    perspectives = perspectives2;
    RiotControl.trigger("perspectivesChanged", perspectives);
  }
  function all() {
    return perspectives.slice(0);
  }
  main();
}
module.exports = PerspectiveStore;
PerspectiveStore.instance = new PerspectiveStore();
RiotControl.addStore(PerspectiveStore.instance);
