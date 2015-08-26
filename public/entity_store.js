var Store = require("./store")
  , RiotControl = require("riotcontrol");
function EntityStore() {
  if (!(this instanceof EntityStore)) return new EntityStore();
  console.log("entity_store");
  var self = this;
  function main() {
    console.log("entity_store|main");
    Store.call(self, {
      loadStore: function() {
        dpd.entities.get(loadStoreGetEntities);
      }
    });
  }
  function loadStoreGetEntities(entities, err) {
    console.log("entity_store/loadStoreGetEntities", JSON.stringify(entities));
    self.all(entities);
    RiotControl.trigger("entitiesChanged", entities);
  }
  main();
}
module.exports = EntityStore;
EntityStore.instance = new EntityStore();
RiotControl.addStore(EntityStore.instance);
