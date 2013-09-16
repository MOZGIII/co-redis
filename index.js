module.exports = function (redisClient) {
  var exports = {};
  require('./commands').forEach(function (command) {
    var commandLower = command.toLowerCase();
    exports[command] = function () {
      var args = Array.prototype.slice.call(arguments);
      return function (done) {
        redisClient[command](args, done);
      }
    }
    exports[commandLower] = exports[command];
  });
  return exports;
};