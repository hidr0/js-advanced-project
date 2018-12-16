const Router = require('express').Router;

const roomRouter = Router();

roomRouter.get('/', (request, response) => {
  response.send("Should have a table containing the rooms and a button to join the specific room");
})

module.exports.roomRouter = roomRouter;