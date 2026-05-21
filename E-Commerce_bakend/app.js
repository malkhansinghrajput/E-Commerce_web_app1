import express from 'express'
import dotenv from 'dotenv'
import indexRouter from './route/indexRoute.js'
import adminRouter from "./route/adminRoute.js"
import customerRouter from './route/customerRoute.js'
dotenv.config({path:"./config/config.env"})
import cors from 'cors'
import connectDB from './dbconnect/connectDb.js';
 
/*
CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.
*/

const PORTNO = process.env.PORT_NO || 4000

var app = express()

//connect Database
 await connectDB()


//built in middleware
// Returns middleware that only parses json
app.use(express.json())

app.use(express.urlencoded({extended:true}))

// CORS code

app.use(cors());
 
//routes
app.use("/admin", adminRouter)

app.use("/customer", customerRouter)

app.use("/",indexRouter)

app.listen(PORTNO,()=>{
    console.log(`Server Listening at http://localhost:${PORTNO}`)
})

app.get("/",(rej,res)=>{
    res.send("server is running....")
})
