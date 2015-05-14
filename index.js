var Server = require('./core/server');

module.exports = function(config) {
  return new Server(config);
};