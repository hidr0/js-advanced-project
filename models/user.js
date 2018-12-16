module.exports = function(sequelize, DataTypes){
  return sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    score: {
      type: DataTypes.INTEGER,
      default: 0,
    },
  });
}