'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.addColumn(
      'users',
      'roomId',
      {
        type: DataTypes.INTEGER,
        references: {
          model: 'rooms',
          key: 'id'
        },
        onDelete: 'SET NULL',
      }
    )
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.removeColumn(
      'users',
      'roomId'
    )
  }
};
