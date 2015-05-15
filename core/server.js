/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Server bootstrap file

*/

var http = require('http');

module.exports = function Server (appConfiguration) {

  /**
   * Module dependencies.
   */

  var configOptions = require('./libs/config').init(appConfiguration).options();

  var app = require('./app');

  /**
   * Get port from environment and store in Express.
   */

  var port = normalizePort(process.env.PORT || configOptions.port || 80);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  var server = http.createServer(app);

  /**
   * Listeners
   */

  server.on('error', onError);
  server.on('listening', onListening);

  server.start = function (next) {
    server.listen(port, configOptions.interface || '0.0.0.0', next);
  };

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }

  /**
   * Public return object
   */

  return {
    start: server.start
  };
}
