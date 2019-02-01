const Router = require('express').Router;
const User = require('../db/schema').models.User;

const lbRouter = Router();

lbRouter.get('/', (req, res) => {
  
  User.findAll({order: [['score', 'DESC']]}).then((users) => {
    users = users.map(u => [u.name, u.score]);
    res.render('leaderboard/index',
    {
      users: users,
    });
  });
});

module.exports.lbRouter = lbRouter;
