console.log("public/index.bundle");
require("./bind-polyfill");
var riot;
global.riot = riot = require("riot");
require("riotcontrol");
require("./entity-list.tag");
require("./entity_store");
riot.mount('*');
