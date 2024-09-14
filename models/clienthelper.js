"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientHelper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ClientHelper.belongsTo(models.Client, {
        foreignKey: "clientId",
        onDelete: "CASCADE",
      });
      ClientHelper.belongsTo(models.Helper, {
        foreignKey: "helperId",
        onDelete: "CASCADE",
      });
    }
  }
  ClientHelper.init(
    {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      helperId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ClientHelper",
    }
  );
  return ClientHelper;
};
