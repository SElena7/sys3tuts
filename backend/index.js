const express = require('express');
require('dotenv').config()
const app = express()
const port = 8115
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require('path')

app.use(cors({origin: 'http://88.200.63.148:3000', // replace with your React app's origin
credentials: true,  }))
app.use(express.json())
app.use(cookieParser("somesecret"))
//Import our custom modules-controllers
const novice= require("./routes/novice")
const users= require("./routes/users")
const db= require("./db/dbConn.js")
//Routes
app.use('/novice', novice);
app.use('/users', users);
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"build")))

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"build","index.html"))
})


///App listening on port
app.listen(process.env.PORT || port, ()=>{
console.log(`Server is running on port: ${process.env.PORT || port}`)
})

