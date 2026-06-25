"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserDonation extends Model {
    static async totalDonationCount(campaignId) {
      const count = await this.count({
        where: { campaignId },
      });
      return count;
    }
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });

      this.belongsTo(models.Campaign, {
        foreignKey: "campaignId",
      });
    }
  }
  UserDonation.init(
    {
      amount: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      campaignId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserDonation",
    },
  );
  return UserDonation;
};
