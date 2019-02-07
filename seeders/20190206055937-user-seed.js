'use strict';
const User = require("../models/index").user;

module.exports = {
  up: () => {
    return User.bulkCreate([
      {
        name: 'hidr0.frbg',
        highscore: 360
      },
      {
        name: 'shadydealer',
        highscore: 361
      }], { validate: true }).catch(errors => {
        errors.forEach(e => {
          console.log(e.errors);
        });
      }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
