'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const db = require("./models/index");
const Room = db.room;

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.set('views', './views');
app.set('view engine', 'mustache')

const roomRouter = require('./routes/room').roomRouter;
const lbRouter = require('./routes/leaderboard').lbRouter;
const startmenuRouter = require('./routes/startmenu').startMenuRouter;

app.use('/', startmenuRouter);
app.use('/rooms', roomRouter);
app.use('/leaderboard', lbRouter);

let socketRooms = {};

function sendUsersToRoom(room){
    const users = Object.getOwnPropertyNames(room);
    users.forEach(user => {
        room[user].emit('updateUsersInRoom', users);
    });
}

function informUserAbout(room, action, otherUser){
    const users = Object.getOwnPropertyNames(room);
    users.forEach(user => {
        if (user !== otherUser.toString()){
            room[user].emit('informUserForOtherUserActicity', otherUser, action);
        }
    });
}

function addUserToRoom(paramsRooms, roomId, currentPlayerName, socket) {
    paramsRooms[roomId] || (paramsRooms[roomId] = {});
    paramsRooms[roomId][currentPlayerName] = socket;
    return paramsRooms[roomId];
}

function removeUserFromRoom(roomName ,userToRemove){
    delete socketRooms[roomName][userToRemove];
    return socketRooms[roomName];
    
}

function getRoomFrom(socket){
    let roomFromSocket = null;
    const roomNames = Object.getOwnPropertyNames(socketRooms);
    roomNames.forEach(roomName =>{
        const playerNames = Object.getOwnPropertyNames(socketRooms[roomName]);
        playerNames.forEach(playerName => {
            if(socket == socketRooms[roomName][playerName]){
                roomFromSocket = {name: roomName, room: socketRooms[roomName]};
                return;
            } 
        })
    })
    return roomFromSocket;
}


io.on('connection', function (socket) {
    
    socket.on('disconnect', function () {
        socketRooms
        const roomObj = getRoomFrom(socket);
        if (roomObj != null){
            const roomName = roomObj.name;
            const room = roomObj.room;
            let leavingPlayer = null;
            const playerNames = Object.getOwnPropertyNames(room);
            playerNames.forEach( playerName =>{
                if(room[playerName] == socket){
                    leavingPlayer = playerName;
                    return
                }
            })
            sendUsersToRoom(room);
            informUserAbout(room, "dissconnected from the room.", leavingPlayer);
            removeUserFromRoom(roomName, leavingPlayer);
            Room.findOne({where: {id: roomName}}).then(room =>{
                room.getPlayers({where: {name: { $not: leavingPlayer}}}).then( players =>{ 
                    room.setPlayers(players);
                });
            });
        } 
    });

    socket.on('enteringRoom', function (params) {
        const room = addUserToRoom(socketRooms,params.roomId, params.userName , socket);
        sendUsersToRoom(room);
        informUserAbout(room, "entered the room.", params.userName);
    })

    socket.on('keyPress', function(params){
        const KEYS = { 38: "UP", 40: "DOWN", 37: "LEFT", 39: "DOWN" };
        const roomId = params.roomId;
        const playerName = params.userName;

        const room = socketRooms[roomId]
        const players = Object.getOwnPropertyNames(room);
        players.forEach(player =>{
            room[player].emit('userPressedKey', playerName, KEYS[params.keyCode])
        })

    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
    Room.findAll({order: ["id"]}).then((rooms) => {
        rooms.forEach(room =>{
            room.setPlayers([]);
        });
    });
});