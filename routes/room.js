const Router = require('express').Router;

const roomRouter = Router();

roomRouter.post('/', (request, response) => {
  
});

roomRouter.get('/', (request, response) => {
  response.render("Should have a table containing the rooms and a button to join the specific room");
})

module.exports.roomRouter = roomRouter;