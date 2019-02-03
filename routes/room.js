const Router = require("express").Router;
const Room = require("../models/index").room;
const User = require("../models/index").user;
const roomRouter = Router();

roomRouter.get("/", (req, res) => {
  let userName = req.query.user;
  
  Room.findAll({order: ["id"]}).then((rooms) => {
    let roomsUserCount = rooms.map(room => {
      return room.countPlayers().then(result => result);
    });
    Promise.all(roomsUserCount).then(ruc => {
      roomsIdsAndUserCount = rooms.map((room, i) => {
        return { id: room.id,
          pc: ruc[i]
        };
      });
      res.render("rooms/index",{
        roomsIdsAndUserCount: roomsIdsAndUserCount,
        userName: userName});
      });  
    });
  });
  
  roomRouter.get("/:id/join", (rq,res) => {
    
  });
  
  module.exports.roomRouter = roomRouter;