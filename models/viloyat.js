'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Viloyat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Viloyat.belongsTo(models.Davlat, {
        foreignKey: 'davlatId'
      })
      Viloyat.hasMany(models.Tuman, {
        foreignKey: 'viloyatId'
      })
    }
  }
  Viloyat.init({
    viloyat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Viloyat',
  });
  return Viloyat;
};