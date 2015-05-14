var Config = require('../../models/Config');

var isInstalled;

Config.sync();

module.exports = checkInstall;

function checkInstall(req, res, next) {
  if (typeof isInstalled === 'undefined') {
    // Value needs to be loaded from database
  }

  if (req.originalUrl !== '/') {
    return next();
  }

  if (!isInstalled) {
    return res.redirect('/install');
  }

  next();
}