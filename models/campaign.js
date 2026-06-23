'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Campaign.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    targetFunds: DataTypes.INTEGER,
    currentFunds: DataTypes.INTEGER,
    category: DataTypes.STRING,
    status: DataTypes.STRING,
    image: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};