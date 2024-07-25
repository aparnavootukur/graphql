const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config')

module.exports = (sequelize, DataTypes) => {
    const Supplier = sequelize.define('Supplier', {
      supplierName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return Supplier;
  };
  