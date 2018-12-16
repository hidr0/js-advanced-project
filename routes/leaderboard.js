const Router = require('express').Router;

const lbRouter = Router();

lbRouter.get('/', (request, response) => {
  response.send("Should have a table containing the users and their highscores in descending order");
});

module.exports.lbRouter = lbRouter;
