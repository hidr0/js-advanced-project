const Router = require('express').Router;

const lbRouter = Router();

lbRouter.get('/', (req, res) => {
  res.send("Should have a table containing the users and their highscores in descending order");
});

module.exports.lbRouter = lbRouter;
