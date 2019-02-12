'use strict';
const roomRouter = require("express").Router();

const db = require("../models/index");
const Room = db.room;
const User = db.user;

roomRouter.get("/", (req, res) => {
  const userName = req.query.user;
  
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
  
  roomRouter.get("/:id/join", (req,res) => {
    const userName = req.query.userName;
    const roomId = req.params.id;
    
    Room.findOne({ where: { id: roomId }}).then((room) =>{
      User.findOne({ where: { name: userName } }).then( (user) =>{
        room.addPlayer(user).then( aaaa =>{
          console.log(aaaa);
        });
      });
    });
    res.render("rooms/show",{
      
    })
  });
  
  module.exports.roomRouter = roomRouter;