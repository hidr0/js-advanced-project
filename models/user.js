var Room = require ('./room');
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    score: {
      type: DataTypes.INTEGER,
      default: 0,
    }
  });
  // User.belongsTo(Room(sequelize, DataTypes));
  return User;
}