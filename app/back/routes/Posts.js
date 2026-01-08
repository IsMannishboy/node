const express = require('express');
const db = require('../db/models');
const router = express.Router();
router.get("/",async (_,res)=>{
    try{
        const posts = await db.Posts.findAll();
        res.json(posts);
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
router.post("/",async  (req,res)=>{
    try{
        const {user_id,title,content,date,likes} = req.body;
        const newPost = await db.Posts.create({
            user_id,
            title,
            content,
            date,
            likes
        })
        res.status(201).json(newPost)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"Internal server error"})
    }
})
router.put("/",async (req,res)=>{
    try{
        const {post_id,title,content} = req.body;
        const UpdatedPost = await db.Posts.update({
            title,
            content
        },{
            where:{
                id:post_id
            }
        })
        res.status(200).json(UpdatedPost)

    }catch(err){
                res.status(500).json({error:"Internal server error"})

    }
    console.log("hello world")
})
router.delete("/:id",async (req,res)=>{
    try{
        const resp = await db.Posts.destroy({
            where:{
                id:req.params.id
            }
        })
        res.status(201).json({message:"Post deleted successfully"})
    }catch(err){
                res.status(500).json({error:err})

    }
})
module.exports  = router;