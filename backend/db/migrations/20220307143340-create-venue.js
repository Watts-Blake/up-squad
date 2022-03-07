"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Venues", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(255),
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING(10),
      },
      lat: {
        type: Sequelize.DECIMAL(6, 4),
      },
      long: {
        type: Sequelize.DECIMAL(6, 4),
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Venues");
  },
};
