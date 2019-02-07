module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define("room", {});
  Room.associate = function(models) {
    Room.hasMany(models.user, {as: "players"});
  };
  return Room;
};