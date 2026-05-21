import express from 'express'
import dotenv from 'dotenv'
import indexRouter from './route/indexRoute.js'
import adminRouter from "./route/adminRoute.js"
import customerRouter from './route/customerRoute.js'
import connectDb from './dbconnect/connectDb.js'
dotenv.config({path:"./config/config.env"})
import cors from 'cors'
 
/*
CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server. The single-origin policy does not allow cross-origin requests and CORS headers are required to bypass this feature.
*/

const PORTNO = process.env.PORT_NO || 4000

var app = express()

//connect Database
connectDb(process.env.DB_URL,process.env.DB_NAME)


//built in middleware
// Returns middleware that only parses json
app.use(express.json())

app.use(express.urlencoded({extended:true}))

//This is a built-in middleware function in Express. It serves static files and is based on serve-static
app.use("/uploadDocuments",express.static('uploadDocuments'))

app.use('/multipleuploaddocuments', express.static('multipleuploaddocuments'))

// CORS code

app.use(cors());
 
//routes
app.use("/admin", adminRouter)

app.use("/customer", customerRouter)

app.use("/",indexRouter)

app.listen(PORTNO,()=>{
    console.log(`Server Listening at http://localhost:${PORTNO}`)
})
