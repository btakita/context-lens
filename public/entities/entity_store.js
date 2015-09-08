var Store = require("../store")
  , RiotControl = require("riotcontrol");
function EntityStore() {
  if (!(this instanceof EntityStore)) return new EntityStore();
  console.log("entities/entity_store");
  var self = this;
  function main() {
    console.log("entities/entity_store|main");
    Store.call(self);
  }
  main();
}
module.exports = EntityStore;
EntityStore.instance = new EntityStore();
RiotControl.addStore(EntityStore.instance);
