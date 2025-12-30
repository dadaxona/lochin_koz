'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Info, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Rasm, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    ism: DataTypes.STRING,
    familiya: DataTypes.STRING,
    sharif: DataTypes.STRING,
    pnfel: DataTypes.STRING,
    seriya: DataTypes.STRING,
    sana: DataTypes.STRING,
    moshina: DataTypes.STRING,
    ishjoy: DataTypes.STRING,
    tel: DataTypes.STRING,
    sud: DataTypes.STRING,
    laqab: DataTypes.STRING,
    jinsi: DataTypes.STRING,
    davlatId: DataTypes.INTEGER,
    viloyatId: DataTypes.INTEGER,
    tumanId: DataTypes.INTEGER,
    mahalla: DataTypes.STRING,
    catigoriya: DataTypes.STRING,
    bolim: DataTypes.STRING,
    toifa: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};