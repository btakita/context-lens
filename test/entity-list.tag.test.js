var support = require(".")
  , test = support.test
  , _ = require("lodash");
test('entity-list|render|GET /entities|200|render entity names',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equals(t.$$("entity-list").length, 1, 't.$$("entity-list").length, 1');

    t.equals(t.requests.length, 0, 't.requests.length, 0');

    var $entityListSearch = t.$(".entity-list-search");
    $entityListSearch.value = "Smi";
    var keyupEvent = document.createEvent("KeyboardEvent");
    keyupEvent.initKeyboardEvent('keyup', true, true, null, false,
      false, false, false, 76, 0);
    $entityListSearch.dispatchEvent(keyupEvent);
    t.clock.tick(150);
    t.equals(t.requests.length, 1, "t.requests.length, 1");

    postEntitiesListReqSmi(t);
    t.deepEquals(_.map(t.$$(".autocomplete-suggestions div"), function(div) {
      return div.textContent;
    }), ["Joe Smith", "Smirnoff Chekov"]);

    t.end();
  });
function postEntitiesListReqSmi(t) {
  var req = t.request("POST", "/entities/list", function(req, uri) {
    console.info("_.keys(req)", _.keys(req));
    console.info("req.requestBody", req.requestBody);
    return t.deepEquals2(JSON.parse(req.requestBody), {"search": "Smi"});
  });
  t.equals(!!(req), true, "!!(req), true");
  t.respond(req,
    200,
    {"Content-Type": "application/json"},
    JSON.stringify([{
      id: "d8301999ed6598c1",
      name: "Joe Smith",
      path: "/entities/joe-smith"
    }, {
      id: "d8301999ed6598c2",
      name: "Smirnoff Chekov",
      path: "/entities/smirnoff-chekov"
    }])
  );
}
