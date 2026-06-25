"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    get percent() {
      let percent = Math.min(
        Math.round((this.currentFunds / this.targetFunds) * 100),
        100 || 0,
      );

      return percent;
    }

    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.hasMany(models.Milestone, {
        foreignKey: "campaignId",
      });

      this.belongsToMany(models.User, {
        through: models.UserDonation,
        foreignKey: "campaignId",
      });

      this.hasMany(models.UserDonation, {
        foreignKey: "campaignId",
      });
    }
  }
  Campaign.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      targetFunds: DataTypes.INTEGER,
      currentFunds: DataTypes.INTEGER,
      category: DataTypes.STRING,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      remainingFunds: {
        type: DataTypes.VIRTUAL,
        get() {
          const remainder = this.targetFunds - this.currentFunds;
          return remainder < 0 ? 0 : remainder;
        },
      },
    },
    {
      sequelize,
      modelName: "Campaign",
    },
  );
  return Campaign;
};
