'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admin.belongsTo(models.Viloyat, {
        foreignKey: 'viloyatId'
      });
      Admin.belongsTo(models.Tuman, {
        foreignKey: 'tumanId'
      });
    }
  }
  Admin.init({
    ism: DataTypes.STRING,
    familiya: DataTypes.STRING,
    sharif: DataTypes.STRING,
    lavozim: DataTypes.STRING,
    viloyatId: DataTypes.INTEGER,
    tumanId: DataTypes.INTEGER,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};