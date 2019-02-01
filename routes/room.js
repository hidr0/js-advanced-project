const Router = require('express').Router;
const Room = require('../db/schema').models.Room;
const User = require('../db/schema').models.User;
const path = require('path')
const roomRouter = Router();

roomRouter.get('/', (req, res) => {
  let userId = req.query.user;
  // Room.create();
  // Room.create();
  // Room.create();
  // Room.create();
  // Room.create();

  Room.findAll({order: ['id']}).then((rooms) => {
    User.find({id: userId}).then((user) => {
      console.log(user);
      console.log(rooms[0]);
      rooms[0].setPlayers(user).then((a)=>{
        console.log(a);
        console.log("As");
      })
      // rooms[0].setPlayers(user).then((a) => {
        // console.log(a);
      //   rooms = rooms.map(room => [room.id, room.players]);
      //   res.render('rooms/index',{rooms: rooms});
      // });
      // rooms[0].addPlayer(user).then(()=> console.log())
    });
  });
});

roomRouter.get('/:id/join', (rq,res) => {

});

module.exports.roomRouter = roomRouter;