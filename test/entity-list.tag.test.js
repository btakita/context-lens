var support = require(".")
  , test = support.test;
test('entity-list|render',
  {html: '<entity-list></entity-list>'},
  function(t) {
    t.mount();
    t.equal(t.$$("entity-list").length, 1);
    t.end();
  });
