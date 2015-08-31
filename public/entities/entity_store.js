var Store = require("../store")
  , RiotControl = require("riotcontrol")
  , dpdEntities = require("./dpd.entities");
function EntityStore() {
  if (!(this instanceof EntityStore)) return new EntityStore();
  console.log("entities/entity_store");
  var self = this;
  function main() {
    console.log("entities/entity_store|main");
    Store.call(self, {
      loadStore: function() {
        dpdEntities().get(loadStoreGetEntities);
      }
    });
  }
  function loadStoreGetEntities(entities, err) {
    console.log("entities/entity_store/loadStoreGetEntities", JSON.stringify(entities));
    self.all(entities);
    RiotControl.trigger("entitiesChanged", entities);
  }
  main();
}
module.exports = EntityStore;
EntityStore.instance = new EntityStore();
RiotControl.addStore(EntityStore.instance);
