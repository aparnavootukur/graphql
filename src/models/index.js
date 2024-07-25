const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config'); // Adjust path if needed

// Initialize models
const models = {
  Inventory: require('./inventory')(sequelize, DataTypes),
  Shipment: require('./shipment')(sequelize, DataTypes),
  Supplier: require('./supplier')(sequelize, DataTypes),
  User:require('./user')(sequelize,DataTypes)
};

module.exports = {
  sequelize,
  ...models, // Spread to include all models
};
