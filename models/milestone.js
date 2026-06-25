"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Milestone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Campaign, {
        foreignKey: "campaignId",
      });
    }
  }
  Milestone.init(
    {
      stepNumber: DataTypes.INTEGER,
      targetAmount: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      isVerified: DataTypes.BOOLEAN,
      campaignId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Milestone",
    },
  );
  return Milestone;
};
