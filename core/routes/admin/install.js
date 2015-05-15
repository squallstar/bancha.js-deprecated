/*
@package   Bancha
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Index router

*/

var express = require('express');
var router = express.Router();

var config = require('../../libs/config').options();
var installMiddleware = require('../../libs/middlewares/install');

// -------------------------------------------------------

router.get('/', showInstall);
router.post('/', showInstall);

function showInstall (req, res, next) {
  if (installMiddleware.isInstalled()) {
    return next();
  }

  var params = {
    base_url: req.body.host || ( req.protocol + '://' + req.get('host') )
  };

  if (req.method === 'POST' && params.base_url) {
    return installMiddleware.configureInstall(params, function () {
      res.redirect('install/complete');
    });
  }

  res.render('install/form', {
    params: params
  });
}

// -------------------------------------------------------

router.get('/complete', showInstallComplete);

function showInstallComplete (req, res) {
  res.render('install/complete');
}

// -------------------------------------------------------

module.exports = router;
