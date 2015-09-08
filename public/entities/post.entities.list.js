module.exports = function(search, success, error) {
  var request = new XMLHttpRequest()
    , success2 = success || function() {}
    , error2 = error || function() {};
  request.open('POST', '/entities/list', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.send(JSON.stringify({search: search}));
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      success2(data, request);
    } else {
      error2(request);
    }
  };
  request.onerror = error2;
};