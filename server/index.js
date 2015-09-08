var seneca = require("seneca")()
  .use('mongo-store', {
    name: 'context-lens-development',
    host: '127.0.0.1',
    port: 27017
  })
  .use(require("./entities"));

var app = require('express')()
  .use(require('body-parser').json())
  .use(seneca.export('web'))
  .listen(3001);
