const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
  logging: console.log,
});

module.exports = sequelize;
