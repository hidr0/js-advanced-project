const Router = require('express').Router;
const User = require('../db/schema').models.User;

const startMenuRouter = Router();

startMenuRouter.get('/', (req, res) => {
  res.render("startmenu/index");
});

startMenuRouter.post('/', (req, res) => {
  userName = req.body["name"];
  User.findOrCreate({where: { name: userName }})
    .spread((user, created) => res.redirect("/rooms?user="+user.id))
    .catch(error => res.send(error["errors"]));
});


module.exports.startMenuRouter = startMenuRouter;