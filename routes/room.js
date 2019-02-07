'use strict';
const roomRouter = require("express").Router();

const db = require("../models/index");
const Room = db.room;

roomRouter.get("/", (req, res) => {
  let userName = req.query.user;
  
  Room.findAll({order: ["id"]}).then((rooms) => {
    let roomsUserCount = rooms.map(room => {
      return room.countPlayers().then(result => result);
    });
    Promise.all(roomsUserCount).then(ruc => {
      let roomsIdsAndUserCount = rooms.map((room, i) => {
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