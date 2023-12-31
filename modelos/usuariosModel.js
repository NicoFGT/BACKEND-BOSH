var usuariosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var usuariosSchema = new Schema ({
    
    nombres:String,
    apellidos:String,
    rol:Number,
    identificacion:String,
    correo:String,
    password:String,
    password2:String
})

const MyModel = mongoose.model("usuarios", usuariosSchema)

usuariosModel.validarIdentificacion = function(post,callback){
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

usuariosModel.validarcorreo = function(post,callback){
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

usuariosModel.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.identificacion = post.identificacion 
    instancia.nombres = post.nombres
    instancia.rol = 2
    instancia.apellidos = post.apellidos
    instancia.correo = post.correo
    instancia.password = post.password
    instancia.password2 = post.password2

    instancia.save((error, creado)=>{
        if (error) {
           console.log(error)
           return callback({state:false}) 
        }
        else{
            return callback({state:true,mensaje:"Usuario guardado"})
        }
    })

}

usuariosModel.cargardatos = function(post,callback){
    MyModel.find({},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

usuariosModel.actualizar = function(post,callback){

    MyModel.findOneAndUpdate({identificacion:post.identificacion},{
        identificacion:post.identificacion,
        nombres:post.nombres,
        apellidos:post.apellidos,
        password:post.password
    },(error,modificacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al actualizar",error:error})
        }
        else{
            return callback({state:true,mensaje:"usuario actualizado"})
        }
    })
}

usuariosModel.eliminar = function(post,callback){

    MyModel.findOneAndDelete({identificacion:post.identificacion},(error,eliminacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al eliminar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Usuario eliminado"})
        }
    })
}

usuariosModel.login = function(post,callback){
    MyModel.find({correo:post.correo,password:post.password},{password: 0},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}


module.exports.usuariosModel = usuariosModel