'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Yuklash extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Yuklash.init({
    xodim: DataTypes.STRING,
    lavozim: DataTypes.STRING,
    fio: DataTypes.STRING,
    pnfel: DataTypes.STRING,
    davlat: DataTypes.STRING,
    viloyat: DataTypes.STRING,
    tuman: DataTypes.STRING,
    mahalla: DataTypes.STRING,
    sana: DataTypes.STRING,
    jinsi: DataTypes.STRING,
    catigoriya: DataTypes.STRING,
    bolim: DataTypes.STRING,
    vaqt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Yuklash',
  });
  return Yuklash;
};