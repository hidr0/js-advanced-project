module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('room', {});
  Room.associate = function(models) {
    Room.hasMany(models.user);
  };
  return Room;
};