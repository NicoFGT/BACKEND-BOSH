var express = require('express')
global.app = express()
global.config = require('./config.js').config
var bodyparser= require ("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const mongoose = require('mongoose')
const { config } = require('./config.js')


app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Credentials",true)
    next()
})

var cors = require('cors')
app.use(cors({
    origin:"http://localhost:4200",
    methods: ["GET","POST", "PUT", "DELETE"]
}))

var session = require ("express-session")({
    secret:config.secretSession, 
    resave: true,
    saveUninitialized:true,
    cookie:{ path:"/",httpOnl:true,maxAge:config.tiemposesion },
    name:config.nombrebd + "Cookie",
    rolling:true
})

app.use(session)

require("./routes.js")


mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/' + config.nombrebd, { useNewUrlParser:true, useUnifiedTopology:true },(error,respuesta) => {
    if (error) {
        console.log(error)
    }
    else{
        console.log("Conexion correcta a Mongo")
    }
})

app.listen(config.puerto, function(){
    console.log ("CONEXION VALIDA")
})