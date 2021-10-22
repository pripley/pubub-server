const { DataTypes } = require("sequelize");
const db = require("../db");

const Review = db.define("review", {
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

module.exports = Review;  