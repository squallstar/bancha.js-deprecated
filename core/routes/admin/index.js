/*
@package   Bancha
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Admin index router

*/

var express = require('express');
var router = express.Router();

var configOptions = require('../../libs/config').options();

// -------------------------------------------------------

router.get('/', showAdmin);

function showAdmin (req, res) {
  res.render('admin/index');
}

// -------------------------------------------------------

module.exports = router;
