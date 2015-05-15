/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Install middle-ware

*/

// Core libraries
var async = require('async');
var path = require('path');

// Database models
var Config = require('../../models/Config');

// Framework libs
var configOptions = require('../config').options();

// Constants
var INSTALL_KEY = 'is_installed';

// Local variables
var isInstalled;

module.exports = checkInstall;

module.exports.configureInstall = configureInstall;

module.exports.isInstalled = checkIsInstalled;

// Middle-ware function to check whether the application has been installed
function checkInstall (req, res, next) {
  async.waterfall([
    function (done) {
      // Skips if the "install" value has already been loaded from the database
      if (typeof isInstalled !== 'undefined') {
        return done();
      }

      // Creates the config table and loads the install value from the database
      Config.sync()
      .then(function () {
        return Config.findOne({ where: { key: INSTALL_KEY } });
      })
      .then(function (item) {
        isInstalled = !!item;
        done();
      });
    },
    function () {
      if (!isInstalled && req.originalUrl.indexOf('/install') === -1) {
        return res.redirect(path.join('/', configOptions.adminPath, 'install'));
      }

      next();
    }
  ]);
}

function configureInstall (options, next) {
  Config.bulkCreate([
    { key: INSTALL_KEY, value: '1' },
    { key: 'base_url', value: options.base_url }
  ]).then(function () {
    isInstalled = true;
    next();
  });
}

function checkIsInstalled () {
  return isInstalled;
}