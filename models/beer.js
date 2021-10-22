const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Beer = db.define("beer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abv: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  ibu: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Beer;