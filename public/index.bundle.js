console.log("public/index.bundle");
require("./function/polyfills");
var riot;
global.riot = riot = require("riot");
require("riotcontrol");
require("./array/polyfills");
require("./entities/entity-list.tag");
require("./entities/entity_store");
riot.mount('*');
