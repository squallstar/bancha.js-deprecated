var Sequelize = require('sequelize');

var config = require('./config').options();

var database = new Sequelize(config.database.url);

module.exports = database;