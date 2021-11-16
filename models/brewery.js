const { DataTypes } = require("sequelize");
const db = require("../db");

const Brewery = db.define("brewery", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,    
  },
  street: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: true,
  },    
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  }   
});

module.exports = Brewery;  