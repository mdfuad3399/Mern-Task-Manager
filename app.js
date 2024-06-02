const express = require("express")
const app = express()
const Router = require("./src/routes/api")


// import sequiry middlewares
const path = require("path")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const hpp = require("hpp")
const helmet = require("helmet")
const xssClean = require("xss-clean")
const cors = require("cors")
const mongoSanitize = require("express-mongo-sanitize")
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

// implement sequiry middlewares
app.use(cors())
app.use(bodyParser.json())
app.use(hpp())
app.use(helmet())
app.use(xssClean())
app.use(mongoSanitize())
app.use(cookieParser())
app.use(limiter)


// Database Intregetion
require("./src/config/db")


// Define Routes
app.set('etag',false)
app.use('/api', Router)
app.use(express.static('client/dist'))




app.use('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


module.exports = app




