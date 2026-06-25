"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Campaigns", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      targetFunds: {
        type: Sequelize.INTEGER,
      },
      currentFunds: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      category: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Active",
      },
      image: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Campaigns");
  },
};
