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
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Brewery;  