'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ism: {
        type: Sequelize.STRING
      },
      familiya: {
        type: Sequelize.STRING
      },
      sharif: {
        type: Sequelize.STRING
      },
      pnfel: {
        allowNull: true,
        type: Sequelize.STRING
      },
      seriya: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sana: {
        allowNull: true,
        type: Sequelize.STRING
      },
      moshina: {
        allowNull: true,
        type: Sequelize.STRING
      },
      ishjoy: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tel: {
        allowNull: true,
        type: Sequelize.STRING
      },
      sud: {
        allowNull: true,
        type: Sequelize.STRING
      },
      laqab: {
        allowNull: true,
        type: Sequelize.STRING
      },
      jinsi: {
        allowNull: true,
        type: Sequelize.STRING
      },
      davlatId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      viloyatId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      tumanId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      mahalla: {
        allowNull: true,
        type: Sequelize.STRING
      },
      catigoriya: {
        type: Sequelize.STRING
      },
      bolim: {
        type: Sequelize.STRING
      },
      toifa: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};