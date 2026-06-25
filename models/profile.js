"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Profile.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "full name tidak boleh kosong" },
          notNull: { msg: "full name tidak boleh kosong" },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "nomor telfon tidak boleh kosong" },
          notNull: { msg: "nomor telfon tidak boleh kosong" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "address tidak boleh kosong" },
          notNull: { msg: "address tidak boleh kosong" },
        },
      },
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    },
  );
  return Profile;
};
