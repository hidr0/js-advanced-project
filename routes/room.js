const Router = require('express').Router;
const path = require('path')
const roomRouter = Router();

roomRouter.post('/', (req, res) => {
  
});

roomRouter.get('/', (req, res) => {
  res.render("Should have a table containing the rooms and a button to join the specific room");
})

roomRouter.get('/:id', (request, res) => {
  res.sendFile(path.join(__dirname, '../', 'views/rooms/show.html'));
});

module.exports.roomRouter = roomRouter;