const Router = require('express').Router;

const startMenuRouter = Router();

startMenuRouter.get('/',(req, res)=> {
  res.render("startmenu/index");
});

startMenuRouter.post('/', (req, res)=> {
  res.send(req.body["name"])
});


module.exports.startMenuRouter = startMenuRouter;