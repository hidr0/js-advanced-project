const Router = require('express').Router;

const roomRouter = Router();

roomRouter.post('/', (req, res) => {
  
});

roomRouter.get('/', (req, res) => {
  res.render("Should have a table containing the rooms and a button to join the specific room");
})

module.exports.roomRouter = roomRouter;