/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Database connection driver

*/

// Core libs
var Sequelize = require('sequelize');

// Framework libs
var configOptions = require('./config').options();

// DB Instance
var database = new Sequelize(configOptions.database.url);

module.exports = database;