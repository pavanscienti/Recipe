import express from "express"
import mongoose from "mongoose"
import cors from 'cors'

import { userRouter } from './routes/users.js'
import { recipeRouter } from "./routes/recipes.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", userRouter)
app.use("/recipes",recipeRouter)

mongoose.connect("mongodb+srv://pvnkumarps:pavan@cluster0.thzbwzz.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("database connected"));

app.listen(3001, () => console.log("Server Started"))
