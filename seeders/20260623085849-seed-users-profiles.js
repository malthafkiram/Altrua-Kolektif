"use strict";

const fs = require("fs").promises;
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const rawData = JSON.parse(
      await fs.readFile("./dataSeeder/user-profile.json", "utf-8"),
    );

    let dataUsers = rawData.map((el) => {
      return {
        username: el.username,
        email: el.email,
        password: bcrypt.hashSync(el.password, 10),
        role: el.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    const insertedUsers = await queryInterface.bulkInsert("Users", dataUsers, {
      returning: true,
    });
    console.log("Insert Table Users Successful!");

    let dataProfiles = rawData.map((el, index) => {
      return {
        fullName: el.profile.fullName,
        phoneNumber: el.profile.phoneNumber,
        address: el.profile.address,
        userId: insertedUsers[index].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    await queryInterface.bulkInsert("Profiles", dataProfiles);
    console.log("Insert Table Profiles Successful!");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Profiles", null, {});
  },
};
