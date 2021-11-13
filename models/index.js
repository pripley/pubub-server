const User = require("./user");
const Brewery = require("./brewery");
const Beer = require("./beer");

//Setup Database Associations here.
User.hasMany(Brewery)
Brewery.belongsTo(User)

User.hasMany(Beer)
Beer.belongsTo(User)

module.exports = {
  User,
  Brewery,
  Beer,  
};
