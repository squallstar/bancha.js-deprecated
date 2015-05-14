var Config = require('../../models/Config');

var isInstalled;

Config.sync();

module.exports = checkInstall;

function checkInstall (req, res, next) {
  if (typeof isInstalled === 'undefined') {
    // Value needs to be loaded from database
  }

  if (req.originalUrl !== '/') {
    return next();
  }

  if (!isInstalled) {
    return showInstall (req, res);
  }

  next();
}

function showInstall (req, res) {
  var params = {};

  if (req.method === 'POST') {
    params.host = req.body.host;
  }

  res.render('install/form', {
    params: params
  });
}