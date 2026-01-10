'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Yuklashes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      xodim: {
        type: Sequelize.STRING
      },
      lavozim: {
        type: Sequelize.STRING
      },
      fio: {
        type: Sequelize.STRING
      },
      pnfel: {
        type: Sequelize.STRING
      },
      davlat: {
        type: Sequelize.STRING
      },
      viloyat: {
        type: Sequelize.STRING
      },
      tuman: {
        type: Sequelize.STRING
      },
      mahalla: {
        type: Sequelize.STRING
      },
      sana: {
        type: Sequelize.STRING
      },
      jinsi: {
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
      vaqt: {
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
    await queryInterface.dropTable('Yuklashes');
  }
};