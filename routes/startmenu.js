const Router = require('express').Router;

const startMenuRouter = Router();

startMenuRouter.get('/',(request, response)=> {
  response.send("Should contain a username field and a continue button");
});


module.exports.startMenuRouter = startMenuRouter;