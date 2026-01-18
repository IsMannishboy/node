const clientRouter = require('express').Router();
const path = require('path');
const viewsDir = path.join(__dirname, "../../front/front/dist");
const {LoginHandler,RegisterHandler,Auth,CSRF} = require("../functions/index.js");
const loghandler = new LoginHandler();
const reghandler = new RegisterHandler()
const auth = new Auth();
const CSRF = new CSRF();
clientRouter.get("/", (req, res) => {
  res.sendFile(path.join(viewsDir, "index.html"));
});
clientRouter.get("/auth/login", (req, res) => {
 
  const loginres = loghandler.login(req.body);
  switch(loginres.status){
    case 200:
        const {session_id,session_value } =  auth.MakeSession(loginres.user_id)
        const err = auth.SetSessionToCash(session_id,session_value)
        if(!err){
          res.json({status:500,message:"redis error"})
          return
        }

        res.cookie("session_id",session_id)
        res.json({status:500,message:"redis error"})
        break;
    case 404:
        res.status(404).json({message:"User not found"});
        break;
    case 401:
        res.status(401).json({message:"Incorrect password"});
        break;
    default:
        res.status(500).json({message:"An error occurred"});
  }
});
clientRouter.get("/auth/register", (req, res) => {
  res.sendFile(path.join(viewsDir, "index.html"));
});
clientRouter.get(/.*/, (req, res) => {
  res.sendFile(path.join(viewsDir, "index.html"));
});

module.exports = clientRouter;
