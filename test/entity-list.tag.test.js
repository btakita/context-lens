var support = require(".")
  , test = support.test
  , _ = require("lodash");
test('entity-list|render|GET /entities|200|render entity names',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equals($("entity-list").length, 1, "entity-list");

    t.equals(t.requests.length, 0);

    var $entityListSearch = $(".entity-list-search");
    $entityListSearch.val("Smi");
    var keyupEvent = document.createEvent("KeyboardEvent");
    keyupEvent.initKeyboardEvent('keyup', true, true, null, false,
      false, false, false, 76, 0);
    $entityListSearch[0].dispatchEvent(keyupEvent);
    t.clock.tick(150);
    t.equals(t.requests.length, 1);

    getEntitiesReqSmi(t);
    t.deepEquals(_.map($(".autocomplete-suggestions div"), function(div) {
      return div.textContent;
    }), ["Joe Smith", "Smirnoff Chekov"]);

    t.end();
  });
function getEntitiesReqSmi(t) {
  var req = t.request("GET", "/entities", function(req, uri) {
    return t.deepEquals2(uri.queryHash, {"name":{"$text":"Smi"}});
  });
  t.equals(!!(req), true);
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
