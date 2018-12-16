var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/', function (req, res) {
    res.send("Index")
});

let rooms = {};

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function (socket) {
        console.log('user disconnected');
    });

    socket.on('enteringRoom', function (params) {
        roomName = params['roomName'];
        userName = params['userName'];
        newJoinedUser = {
            userName: userName,
            socket: socket
        };

        if (rooms[roomName] === undefined) {
            rooms[roomName] = [newJoinedUser];
        } else {
            rooms[roomName].push(newJoinedUser);
        }
        console.log(rooms);

        rooms[roomName].forEach((user) => {
            user['socket'].emit('userJoined', {
                userName: newJoinedUser['userName']
            })
        })


    })
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});