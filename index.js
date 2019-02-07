'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

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

let rooms = {};

function updateUsersInRoom(room) {
    for (var key in room) {
        room.hasOwnProperty(key) &&
            room[key].emit('updateUsersInRoom', Object.keys(room));
    }
}

function addUserToRoom(rooms, param, socket) {
    rooms[param['roomName']];
    rooms[param['roomName']] || (rooms[param['roomName']] = {});
    const userName = param['userName'];
    rooms[param['roomName']][userName] = socket;
    return rooms[param['roomName']];
}
io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        // Need to find a way to know the sockets room in order to disconnect
    });

    socket.on('enteringRoom', function (params) {
        const room = addUserToRoom(rooms, params, socket);
        console.log(rooms);
        updateUsersInRoom(room);
        console.log(rooms);
    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});