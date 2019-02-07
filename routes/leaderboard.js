'use strict';
const lbRouter = require("express").Router();

const db = require("../models/index");
const User = db.user;


lbRouter.get('/', (req, res) => {
  
  User.findAll({order: [["score", "DESC"]]}).then((users) => {
    res.render("leaderboard/index",
    {
      users: users,
    });
  });
});

module.exports.lbRouter = lbRouter;