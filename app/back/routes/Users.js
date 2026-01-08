const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db/models");
const { Model } = require("sequelize");
const UsersRouter = express.Router();    
UsersRouter.get("/",async (_,res)=>{
    try{
        const users = await db.Users.findAll();
        res.json(users);
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
UsersRouter.post("/",async (req,res)=>{
    try{
        const {username,age,email,password} = req.body
        HashedPassword = await  bcrypt.hash(password,10);
        const Newuser = await db.Users.create({
            username,
            age,
            email,
            HashedPassword,
        })
        res.json(Newuser);
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
module.exports = UsersRouter;