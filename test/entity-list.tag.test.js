var support = require(".")
  , test = support.test
  , _ = require("lodash");
test('entity-list|render|GET /entities|200|render entity names',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equal(t.$$("entity-list").length, 1);
    t.equal(t.requests.length, 1);
    var getEntitiesReq = t.request("GET", "/entities");
    t.equal(!!(getEntitiesReq), true);
    getEntitiesReq.respond(
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
    t.clock.tick(2);
    t.deepEquals(_.map(t.$$("entity-list li .entity-name"), function(span) {
      return span.textContent;
    }), ["Joe Smith", "Lupita Juarez"]);
    t.end();
  });
