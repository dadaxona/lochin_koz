'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catigoriya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Catigoriya.hasMany(models.Bolim, {
        foreignKey: 'catigoriyaId'
      });
    }
  }
  Catigoriya.init({
    catigoriya: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Catigoriya',
  });
  return Catigoriya;
};