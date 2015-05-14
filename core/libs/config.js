/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Application config singleton

*/

var extend = require('extend');

module.exports = new Config();

function Config() {
  var self = this,
      options = {};

  self.init = function (customOptions) {
    switch (process.env.NODE_ENV) {
      case 'production':
        options.env = 'production';
        break;
      default:
        options.env = 'development';
    }

    extend(
      true,
      options,
      require('../config/' + options.env + '.json'),
      customOptions
    );

    return self;
  };

  self.options = function () {
    return options;
  };
};