var User = require ('./user');

module.exports = function(sequelize, DataTypes){
    var Room = sequelize.define('room', {
    });
    Room.hasMany(User(sequelize, DataTypes), {as: 'players'});
    return Room;
}