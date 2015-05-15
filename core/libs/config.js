/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Config singleton

*/

var extend = require('extend');
var path = require('path');

module.exports = new Config();

function Config() {
  var self = this,
      options = {};

  // Initialised the config
  self.init = function (customOptions) {
    switch (process.env.NODE_ENV) {
      case 'production':
        options.env = 'production';
        break;
      default:
        options.env = 'development';
    }

    // Extends the base json file with the custom options
    extend(
      true,
      options,
      require('../config/default.json'),
      customOptions
    );

    // Auto generates the application path when not given
    if (!options.appPath) {
      options.appPath = getAppPath();
    }

    return self;
  };

  // Returns a read-only clone of the options object
  self.options = function () {
    return extend(true, {}, options);
  };
}

// Gets the directory of the file that originally requested the core
function getAppPath () {
  return path.dirname(require.main.filename) + '/';
}