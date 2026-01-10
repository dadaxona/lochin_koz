'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bolim extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bolim.belongsTo(models.Catigoriya, {
        foreignKey: 'catigoriyaId'
      });
      Bolim.hasMany(models.Toifa, {
        foreignKey: 'bolimId'
      });
    }
  }
  Bolim.init({
    catigoriyaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Catigoriyas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    bolim: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Bolim',
  });
  return Bolim;
};