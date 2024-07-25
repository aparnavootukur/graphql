const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
 
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return User;
  };
  