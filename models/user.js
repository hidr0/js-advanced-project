module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      default: 0
    },
    highscore: {
      type: DataTypes.INTEGER,
      default: 0
    }
  });
  User.associate = function(models) {
  };
  return User;
};