var support = require(".")
  , test = support.test
  , _ = require("lodash");
test('entity-list|render|GET /entities|200|render entity names|Get /perspectives|200|render perspective counts',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equal(t.$$("entity-list").length, 1);
    t.equal(t.requests.length, 2);
    var getEntitiesReq = t.request("GET", "/entities");
    t.equal(!!(getEntitiesReq), true);
    t.respond(getEntitiesReq,
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
    t.equal(t.$("entity-list .entity-stats").textContent, "2 entities");
    t.deepEquals(_.map(t.$$("entity-list li .entity-name"), function(span) {
      return span.textContent;
    }), ["Joe Smith", "Lupita Juarez"]);

    var getPerspectivesReq = t.request("GET", "/perspectives");
    t.equal(!!(getPerspectivesReq), true);
    t.respond(getPerspectivesReq,
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
    t.deepEquals(_.map(t.$$("entity-list li .perspective-length"), function(span) {
      return span.textContent;
    }), ["1 perspective", "1 perspective"]);
    t.end();
  });
