'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Davlat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Davlat.hasMany(models.Viloyat, {
        foreignKey: 'davlatId'
      })
    }
  }
  Davlat.init({
    davlat: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Davlat',
  });
  return Davlat;
};