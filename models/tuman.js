'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tuman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tuman.belongsTo(models.Viloyat, {
        foreignKey: 'viloyatId'
      })
    }
  }
  Tuman.init({
    viloyatId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Viloyats',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    tuman: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tuman',
  });
  return Tuman;
};