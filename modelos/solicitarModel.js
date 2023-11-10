var solicitarModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var solicitarSchema = new Schema ({
    
    nombres:String,
    apellidos:String,
    rol:Number,
    identificacion:String,
    correo:String,
    direccion:String,
    telefono:Number,
    ingresos:Number,
    
})

const MyModel = mongoose.model("solicitar", solicitarSchema)

solicitarModel.validarIdentificacion = function(post,callback){
    MyModel.find({identificacion:post.identificacion},{},(error, documentos) => {
        if (error) {
            return callback ({state:false})
        }
        else{
            console.log(documentos)
            if (documentos.length == 0) {
                return callback({continuar:true})
            }
            else{
                return callback({continuar:false}) 
            }
        }
    })
}

solicitarModel.validarcorreo = function(post,callback){
    MyModel.find({correo:post.correo},{},(error, documentos) => {
        if (error) {
            return callback ({state:false})
        }
        else{
            console.log(documentos)
            if (documentos.length == 0) {
                return callback({continuar:true})
            }
            else{
                return callback({continuar:false}) 
            }
        }
    })
}

solicitarModel.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.identificacion = post.identificacion 
    instancia.nombres = post.nombres
    instancia.rol = 2
    instancia.apellidos = post.apellidos
    instancia.correo = post.correo
    instancia.direccion = post.direccion
    instancia.telefono = post.telefono
    instancia.ingresos = post.ingresos

    instancia.save((error, creado)=>{
        if (error) {
           console.log(error)
           return callback({state:false}) 
        }
        else{
            return callback({state:true,mensaje:"Tu tarjeta Bosh esta en camino"})
        }
    })

}

solicitarModel.cargardatos = function(post,callback){
    MyModel.find({},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

solicitarModel.actualizar = function(post,callback){

    MyModel.findOneAndUpdate({identificacion:post.identificacion},{
        identificacion:post.identificacion,
        nombres:post.nombres,
        apellidos:post.apellidos,
        correo:post.correo,
        direccion:post.direccion,
        telefono:post.telefono,
        ingresos:post.ingresos
    },(error,modificacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al actualizar",error:error})
        }
        else{
            return callback({state:true,mensaje:"usuario actualizado"})
        }
    })
}

solicitarModel.eliminar = function(post,callback){

    MyModel.findOneAndDelete({identificacion:post.identificacion},(error,eliminacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al eliminar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Usuario eliminado"})
        }
    })
}

solicitarModel.login = function(post,callback){
    MyModel.find({correo:post.correo,password:post.password},{password: 0},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}


module.exports.solicitarModel = solicitarModel