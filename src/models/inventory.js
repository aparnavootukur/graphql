const { DataTypes,Sequelize } = require('sequelize');
const sequelize = require('../../config/config')


module.exports = (sequelize) => {
  const Inventory = sequelize.define('Inventory', {
    itemName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouseLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Inventory;
};

