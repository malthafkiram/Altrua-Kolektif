"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async totalDonationCount(campaignId) {
      const count = await this.count({
        where: { campaignId },
      });
      return count;
    }

    static associate(models) {
      this.hasOne(models.Profile, {
        foreignKey: "userId",
      });

      this.hasMany(models.Campaign, {
        foreignKey: "userId",
      });

      this.belongsToMany(models.Campaign, {
        through: models.UserDonation,
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "username tidak boleh kosong" },
          notNull: { msg: "username tidak boleh kosong" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "email tidak boleh kosong" },
          notNull: { msg: "email tidak boleh kosong" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "password tidak boleh kosong" },
          notNull: { msg: "password tidak boleh kosong" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "role tidak boleh kosong" },
          notNull: { msg: "role tidak boleh kosong" },
        },
      },
    },
    {
      hooks: {
        async beforeCreate(user, options) {
          const bcryptjs = require("bcryptjs");
          user.password = await bcryptjs.hash(user.password, 10);
        },
      },
      sequelize,
      modelName: "User",
    },
  );
  return User;
};
