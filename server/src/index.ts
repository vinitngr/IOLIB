import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'node:path';

const app = express()

//cors and evn accesibililty 
dotenv.config()
app.use(cors())

//accesibility 
app.use(express.json())
app.use(cookieParser())

//production setup 
if(process.env.ENV == 'production'){
    const clientpath = path.resolve( __dirname ,'../../client/dist')

    app.use(express.static(clientpath))
    app.get('*' , (req , res)=>{
        res.sendFile(path.join(clientpath , 'index.html'))
    })
}

//auth router 
import authRoute from './routes/auth.route';
app.use('/api/auth' , authRoute)
import addRoute from './routes/add.route';
app.use('/api/add' , addRoute)
//xyz router here


// server test route
app.get('/test' , (req, res)=>{
    res.send('testing...')
})

//runs the express server
const port: number = Number(process.env.PORT) || 3000;
app.listen(port  , "0.0.0.0" , ()=>{
    console.log(`✅ Server running at: http://localhost:${port}`);
})