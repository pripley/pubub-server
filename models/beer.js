const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Beer = db.define("beer", {
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
  servingStyle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flavor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  availability: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Beer;