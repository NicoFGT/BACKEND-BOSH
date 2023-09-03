var express = require('express')
global.app = express()
global.config = require('./config.js').config
var bodyparser= require ("body-parser")
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const mongoose = require('mongoose')
const { config } = require('./config.js')

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
    console.log ("hola Nico buen dia" + config.puerto)
})