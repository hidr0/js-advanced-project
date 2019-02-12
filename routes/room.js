'use strict';
const roomRouter = require("express").Router();

const db = require("../models/index");
const Room = db.room;
const User = db.user;

roomRouter.get("/", (req, res) => {
  let userName = "";
  User.findOne({where: {name: req.query.user}}).then(user => {
    if(user === null || req.query.user == ""){
      return res.redirect('/'); 
    }else{
      userName = user.name;
    }
  });

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
      console.log(room);
      const roomPlayerCount = room.countPlayers().then( (count) => {
       if(count < 2){
        User.findOne({ where: { name: userName } }).then( (user) =>{
          if (user == null){
            res.render("startmenu/errors", {userName: userName, errorMessage: "Error with finding user", backUrl: "/"});
          }else{
            room.addPlayer(user).then( () =>{
              return res.redirect(`/rooms/${room.id}?userName=${user.name}`); 
            });
          }
      });
       }else{
        res.render("startmenu/errors", {userName: userName, errorMessage: "The room is full", backUrl: "/rooms?user=" + userName});
       }
      });
      
    });
  });

  roomRouter.get("/:id/", (req, res) =>{
    const userName = req.query.userName;
    const roomId = req.params.id;
    Room.findOne({ where: {id: roomId}}).then(room =>{
      room.getPlayers().then(players =>{
        let currentPlayer = null;
        players.forEach(player => {
          if (player.name == userName){
            currentPlayer = player;
          }
        });
        if (currentPlayer == null){
          res.render("startmenu/errors", {userName: userName, errorMessage: "Error with finding user", backUrl: "/"});
        }else{
          res.render("rooms/show",{userName: currentPlayer.name, players: players, currentPlayerSocketID: currentPlayer.id, roomId: roomId});
        }
      })
    })
  });
  
  module.exports.roomRouter = roomRouter;