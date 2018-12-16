const express = require('express');
const app = express();
const port = 3000;

const roomRouter = require('./routes/room').roomRouter;
const lbRouter = require('./routes/leaderboard').lbRouter;
const startmenuRouter = require('./routes/startmenu').startMenuRouter;

app.use('/', startmenuRouter);
app.use('/rooms', roomRouter);
app.use('/leaderboard', lbRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));