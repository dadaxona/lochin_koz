'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Toifa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Toifa.belongsTo(models.Bolim, {
        foreignKey: 'bolimId'
      })
    }
  }
  Toifa.init({
    bolimId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Bolims',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    toifa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Toifa',
  });
  return Toifa;
};