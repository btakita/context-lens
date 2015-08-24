var Store = require("./store")
  , RiotControl = require("riotcontrol");
function EntityStore() {
  if (!(this instanceof EntityStore)) return new EntityStore();
  console.log("entity_store");
  var self = this
    , entities = [];
  function main() {
    console.log("entity_store|main");
    Store.call(self, {
      loadStore: function() {
        dpd.entities.get(loadStoreGetEntities);
      }
    });
    self.all = all;
  }
  function loadStoreGetEntities(entities2, err) {
    console.log("entity_store/loadStoreGetEntities", JSON.stringify(entities2));
    entities = entities2;
    RiotControl.trigger("entitiesChanged", entities);
  }
  function all() {
    return entities.slice(0);
  }
  main();
}
module.exports = EntityStore;
EntityStore.instance = new EntityStore();
RiotControl.addStore(EntityStore.instance);
