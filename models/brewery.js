const { DataTypes } = require("sequelize");
const db = require("../db");

const Brewery = db.define("brewery", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Brewery;  