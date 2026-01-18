import bc from "bcrypt";
import db from "../db/models/index.js";
import crypto from 'crypto';
const key = "1234";
class CSRF{
    MakeCSRF(user_id){
        // like jwt: 2 values separated by . first one is payload second one is hmac signature
        const ExpDate = Date.now() + 24 * 60 * 60 * 1000;
        const payload = `${user_id},${ExpDate}`
        const signature = crypto.createHmac("sha256",key).update(payload).digest("hex");
        return `${payload}.${signature}`

    }
    CheckCSRF(){

    }
}
class Auth{
    MakeSession(user_id){
        const sessionId = crypto.randomBytes(15).toString('hex');
        const session_value = {
            "user_id":user_id,
            "exp": Date.now() + 24 * 60 * 60 * 1000,

        } 
        return {sessionId,session_value}
    }
    SetSessionToCash(session_id,value){
        
        // adding session to redis
        return error 
    }
    CheckSessionId(session_id){
        //get session by id and check exp date
    }

}
class LoginHandler {
   username;
   password;
   auth = new Auth();
    
    async login(data) {
        this.username = data.username;
        this.password = data.password;
        try{
            var resp = await db.Users.FindeOne({
            where:{
                username:this.username
            }
        });
        }catch(err){
            return {valid:false,message:"Database error",status:500}
        }
        
        if(!resp){
            return {valid:false,message:"User not found",status:404}
        }
        const match = await bc.compare(this.password,resp.password);
        if(!match){
            return {valid:false,message:"Incorrect password",status :401}
        }
        
        return {valid:true,message:"Login successful",status:200,user_id:resp.id}

    }
}
class RegisterHandler {
    username;
    age;
    email;
    password;
    auth = new Auth();
   
    async register(data){
        this.username = data.username;
        this.age = data.age;
        this.email = data.email;
        this.password = data.password;
        const HashedPassword = await bc.hash(this.password,10);
        try{
            var insert = await db.Users.create({
            username:this.username,
            age:this.age,
            email:this.email,
            password:HashedPassword
        });
        }catch(err){
            return {valid:false,message:"Registration failed",status:500}
        }
        
        return  {valid:true,message:"registeration successful",status:200,user_id:insert.id};

    }
}

export {LoginHandler,RegisterHandler,Auth};