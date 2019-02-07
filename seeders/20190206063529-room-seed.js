'use strict';
const db = require("../models/index");
const Room = db.room;

module.exports = {
  up: () => {
    return Room.bulkCreate([
      {},
      {},
      {},
      {},
      {}
    ], { validate: true })
      .catch(errors => {
        console.log(errors);
        errors.forEach(e => {
          console.log(e.errors);
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  }
};
