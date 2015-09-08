var _ = require("lodash");
module.exports = function entities(options) {
  var seneca = this;
  function main() {
    seneca.add('init:entities', initEntities);
    seneca.add('role:entities,cmd:list', list);
    seneca.add('role:entities,cmd:save', save);
  }
  function initEntities(msg, respond) {
    console.info("initEntities");
    this.act('role:web', {
      use: {
        prefix: '/entities',
        pin: 'role:entities,cmd:*',
        map: {
          list: {GET: true, POST: true},
          save: {POST: true}
        }
      }
    }, respond);
  }
  function list(msg, respond) {
    var entitiesCollection2 = entitiesCollection()
      , search = msg.search;
    if (search) {
      entitiesCollection2.list$({$text: {$search: search}}, function(err, entities) {
        respond(null, {entities: entities});
      });
    } else {
      respond(null, {entities: []});
    }
  }
  function save(msg, respond) {
    var entitiesCollection2 = entitiesCollection();
    var entity = entitiesCollection2.make$();
    _.extend(entity, msg.attributes);
    entity.save$(function(err, entitiesCollection3) {
      respond();
    });
  }
  function entitiesCollection() {
    return seneca.make('entities');
  }
  main();
};
