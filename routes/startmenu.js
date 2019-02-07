'use strict';
const startMenuRouter = require("express").Router();

const db = require("../models/index");
const User = db.user;

startMenuRouter.get('/', (req, res) => {
  res.render("startmenu/index");
});

startMenuRouter.post('/', (req, res) => {
  let userName = req.body["name"];
  User.findOrCreate({ where: { name: userName } })
    .spread((user, created) => {
      let u = user || created;
      u.update({ score: 0 }).then(() => {
        res.redirect("/rooms?user=" + user.name);
      })
    })
    .catch(error => res.send(error["errors"]));
});


module.exports.startMenuRouter = startMenuRouter;