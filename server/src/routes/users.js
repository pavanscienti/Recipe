import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js";

const router = express.Router()

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if(user){
      return  res.json({message:"User already exist"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({username,password:hashedPassword});
    await newUser.save();
    res.json({message:"User Registered"})
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if(!user){
        return res.json({message:"User not found or not exist please register first"})
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.json({message:"Password not is not correct"})
    }
    else{
        const token = jwt.sign({id:user._id},"secret");
        res.json({token, userID: user._id});
    }
});

export { router as userRouter };


// export const verifyToken = (req, res, next) => {
//     const token = req.headers.authorizarion;
//     if(token){
//         jwt.verify(token, "secret" , (err) => {
//             if(err) return res.sendStatus(403);
//             next();
//         });
//     } else{
//         res.sendStatus(401);
//     }
// }

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; // Corrected header name
    if (token) {
        jwt.verify(token, "secret", (err) => {
            if (err) return res.sendStatus(403);
            next();
        });
    } else {
        res.sendStatus(401);
    }
}