import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path';
import connectDB from './configs/db';
const app = express()

//cors and evn accesibililty 
dotenv.config()
app.use(
    cors({
      origin: process.env.FRONTEND_URL || "http://localhost:5173", 
      credentials: true,
    })
  );

//accesibility 
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
//production setup 
if(process.env.ENV == 'production'){
    const clientpath = path.resolve( __dirname ,'../../client/dist')

    app.use(express.static(clientpath))
    app.get('*' , (req , res)=>{
        res.sendFile(path.join(clientpath , 'index.html'))
    })
}

import authRoute from './routes/auth.route';
app.use('/api/auth' , authRoute)
import addRoute from './routes/add.route';
app.use('/api/add' , addRoute)
import chatRoute from './routes/chat.route';
app.use('/api/chat' , chatRoute)
import getRoute from './routes/get.route';
app.use('/api/get' , getRoute)


// server test route
app.get('/test' , (req, res)=>{
    res.send('testing...')
})

//runs the express server
const port: number = Number(process.env.PORT) || 3000;
app.listen(port  , "0.0.0.0" , ()=>{
    console.log(`✅ Server running at: http://localhost:${port}`);
    connectDB()
})