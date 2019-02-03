const Router = require("express").Router;
const User = require("../models/index").user;

const lbRouter = Router();

lbRouter.get('/', (req, res) => {
  
  User.findAll({order: [["score", "DESC"]]}).then((users) => {
    res.render("leaderboard/index",
    {
      users: users,
    });
  });
});

module.exports.lbRouter = lbRouter;