var support = require(".")
  , test = support.test
  , _ = require("lodash");
test('entity-list|render|GET /entities|200|render entity names|Get /perspectives|200|render perspective counts',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equals($("entity-list").length, 1, "entity-list");
    t.equals(t.requests.length, 2);

    getEntitiesReq(t);
    t.deepEquals(_.map($("entity-list li .entity-name"), function(span) {
      return span.textContent;
    }), ["Joe Smith", "Lupita Juarez"]);

    getPerspectivesReq(t);
    t.deepEquals(_.map($("entity-list li .perspective-length"), function(span) {
      return span.textContent;
    }), ["1 perspective", "1 perspective"]);

    t.end();
  });
function getEntitiesReq(t) {
  var req = t.request("GET", "/entities");
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
      name: "Lupita Juarez",
      path: "/entities/lupita-juarez"
    }])
  );
}
function getPerspectivesReq(t) {
  var req = t.request("GET", "/perspectives");
  t.equals(!!(req), true);
  t.respond(req,
    200,
    {"Content-Type": "application/json"},
    JSON.stringify([{
      id: "d8301999ed6599c1",
      entityIds: ["d8301999ed6598c1"],
      path: "/perspectives/joe-smith"
    }, {
      id: "d8301999ed6599c2",
      entityIds: ["d8301999ed6598c2"],
      path: "/perspectives/lupita-juarez"
    }])
  );
}