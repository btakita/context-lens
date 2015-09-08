var sinon = require("sinon")
  , test = require('tape-catch')
  , _ = require("lodash")
  , riot = require("riot")
  , bundle = require("../public/index.bundle")
  , ayepromise = window.ayepromise = require("ayepromise")// TODO: Remove when https://github.com/deployd/deployd/issues/644 is resolved
  , URI = require("uri-js")
  , deepEquals = require("deep-equal")
  , $ = require("../public/selectors/$")
  , $$ = require("../public/selectors/$$")
  ;
document.querySelector('body').innerHTML += '<riot-wrapper></riot-wrapper>';
var support = {
  setup: setup,
  test: function() {
    console.log("test/index|test");
    var args = Array.prototype.slice.call(arguments)
      , fn = args.pop()
      , params;
    params = (args.length > 1) ? args.pop() : {};
    args.push(function(t) {
      _.extend(t, setup(t, params));
      fn(t);
    });
    return test.apply(test, args);
  }
};
module.exports = support;
function setup(t, params) {
  var end2 = t.end
    , self = {
      bundle: bundle,
      deepEquals2: deepEquals,
      end: end
    }
    , clock
    , xhr
    , requests;
  function main() {
    setupHelpers();
    setupDOM();
    setupExceptionHandling();
    logTestName();
    setupSelectors();
    setupSinon();
    setupApp();
    disableConsoleLog();
  }
  function setupDOM() {
    var html = params.html || "";
    $("riot-wrapper").innerHTML = html;
  }
  function setupExceptionHandling() {
    process.on('uncaughtException', function(err) {
      if (err) {
        if (err.stack) {
          console.error(err.stack);
        } else {
          console.trace(err);
        }
      }
    });
  }
  function logTestName() {

  }
  function setupSelectors() {
    self.$ = $;
    self.$$ = $$;
  }
  function setupSinon() {
    clock = self.clock = sinon.useFakeTimers();
    xhr = self.xhr = sinon.useFakeXMLHttpRequest();
    requests =  self.requests = [];
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
    self.request = function(method, url, fn) {
      var fn2 = fn || function() {return true};
      return _.find(requests, function(req) {
        var uri = URI.parse(req.url)
          , query = uri.query;
        console.info("query", query, !!query);
        uri.queryHash = query ? JSON.parse(decodeURIComponent(query)) : null;
        return req.method == method.toUpperCase() && (req.url == url || uri.path == url) && fn2(req, uri);
      });
    };
    self.respond = function(request, status, headers, body) {
      request.respond(status, headers, body);
      self.clock.tick(2);
    };
  }
  function setupHelpers() {
    self._ = _;
    self.mount = mount;
  }
  function mount(selector, tagName, opts) {
    console.log("test/index|mount", selector);
    riot.mount(selector || '*', tagName, opts);
  }
  function setupApp() {

  }
  function disableConsoleLog() {
    if (!process.env.LOG) {
      //console.log = function() {
      //}
    }
  }
  function end() {
    clock.restore();
    xhr.restore();
    end2.apply(t);
  }
  main();
  return self;
}
