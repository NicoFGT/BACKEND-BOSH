var listaModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var listaSchema = new Schema ({
    
    nombres:String,
    apellidos:String,
    identificacion:String,
    direccion:String,
    telefono:Number,
    ingresos:Number,
    correo:String,
    
})

const MyModel = mongoose.model("lista", listaSchema)

listaModel.validarIdentificacion = function(post,callback){
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

listaModel.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.identificacion = post.identificacion 
    instancia.nombres = post.nombres
    instancia.apellidos = post.apellidos
    instancia.direccion = post.direccion
    instancia.telefono = post.telefono
    instancia.ingresos = post.ingresos
    instancia.correo = post.correo
    
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

listaModel.cargardatos = function(post,callback){
    MyModel.find({},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

listaModel.cargaridentificacion = function(post,callback){
    MyModel.find({identificacion:post.identificacion},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

listaModel.cargarid = function(post,callback){
    MyModel.find({_id:post.id},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

listaModel.actualizar = function(post,callback){

    MyModel.findOneAndUpdate({identificacion:post.identificacion},{
        identificacion:post.identificacion,
        nombres:post.nombres,
        apellidos:post.apellidos,
        direccion:post.direccion,
        telefono:post.telefono,
        ingresos:post.ingresos,
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

listaModel.eliminar = function(post,callback){

    MyModel.findOneAndDelete({identificacion:post.identificacion},(error,eliminacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al eliminar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Usuario eliminado"})
        }
    })
}


module.exports.listaModel = listaModel