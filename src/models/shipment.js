const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config')

module.exports = (sequelize, DataTypes) => {
    const Shipment = sequelize.define('Shipment', {
    
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estimatedDeliveryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
    return Shipment;
  };
  

