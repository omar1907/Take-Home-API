"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Helper extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Helper.belongsToMany(models.Client, {
        through: models.ClientHelper,
        foreignKey: "helperId",
        otherKey: "clientId",
      });
    }
  }
  Helper.init(
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      city: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Helper",
    }
  );
  return Helper;
};
