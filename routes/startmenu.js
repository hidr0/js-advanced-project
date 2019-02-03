const User = require("../models/index").user;
const Router = require("express").Router;

const startMenuRouter = Router();

startMenuRouter.get('/', (req, res) => {
  res.render("startmenu/index");
});

startMenuRouter.post('/', (req, res) => {
  userName = req.body["name"];
  User.findOrCreate({where: { name: userName }})
    .spread((user, created) => {
      u = user ? user : created;
      u.update({score: 0}).then(() => {
        res.redirect("/rooms?user="+user.name);
      })
    })
    .catch(error => res.send(error["errors"]));
});


module.exports.startMenuRouter = startMenuRouter;