var Sequelize = require('sequelize');

var database = require('../libs/database');

var Config = database.define('config', {
  key: {
    type: Sequelize.STRING,
    field: 'configKey',
    unique: true,
    allowNull: false
  },
  value: {
    type: Sequelize.STRING,
    field: 'configValue'
  }
}, {
  freezeTableName: true
});

module.exports = Config;