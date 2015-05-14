/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Install middle-ware

*/

// Core libraries
var async = require('async');

// Database models
var Config = require('../../models/Config');

// Constants
var INSTALL_KEY = 'is_installed';

// Local variables
var isInstalled;

module.exports = checkInstall;

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
      if (!isInstalled) {
        return showInstall (req, res);
      }

      next();
    }
  ]);
}

// Shows the install form
function showInstall (req, res) {
  var params = {};

  if (req.method === 'POST') {
    params.host = req.body.host;
  }

  res.render('install/form', {
    params: params
  });
}