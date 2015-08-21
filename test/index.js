var sinon = require("sinon")
  , test = require('tape')
  , _ = require("lodash")
  , riot = require("riot")
  , bundle = require("../public/index.bundle")
  , ayepromise = window.ayepromise = require("ayepromise")// TODO: Remove when https://github.com/deployd/deployd/issues/644 is resolved
  , dpd = require("../public/dist/dpd");
document.querySelector('body').innerHTML += '<context-lens-wrapper></context-lens-wrapper>';
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
      end: end
    }
    , clock
    , xhr
    , requests;
  function main() {
    setupHelpers();
    setupDOM();
    //setupExceptionHandling();
    logTestName();
    setupSinon();
    setupDpd();
    setupApp();
    disableConsoleLog();
  }
  function setupDOM() {
    var html = params.html || "";
    self.$("context-lens-wrapper").innerHTML = html;
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
  function setupSinon() {
    clock = self.clock = sinon.useFakeTimers();
    xhr = self.xhr = sinon.useFakeXMLHttpRequest();
    requests =  self.requests = [];
    xhr.onCreate = function (xhr) {
      requests.push(xhr);
    };
  }
  function setupDpd() {
    self.dpd = dpd
  }
  function setupHelpers() {
    self.$ = _.bind(document.querySelector, document);
    self.$$ = _.bind(document.querySelectorAll, document);
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
