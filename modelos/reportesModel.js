var reportesModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var reportesSchema = new Schema ({
    
    nombres:String,
    apellidos:String,
    identificacion:String,
    deuda:Number,
})

const MyModel = mongoose.model("reportes", reportesSchema)

reportesModel.validarIdentificacion = function(post,callback){
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

reportesModel.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.identificacion = post.identificacion 
    instancia.nombres = post.nombres
    instancia.apellidos = post.apellidos
    instancia.deuda = post.deuda
    
    
    instancia.save((error, creado)=>{
        if (error) {
           console.log(error)
           return callback({state:false}) 
        }
        else{
            return callback({state:true,mensaje:"Reporte guardado"})
        }
    })

}

reportesModel.cargardatos = function(post,callback){
    MyModel.find({},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

reportesModel.cargaridentificacion = function(post,callback){
    MyModel.find({identificacion:post.identificacion},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

reportesModel.cargarid = function(post,callback){
    MyModel.find({_id:post.id},(error,documentos) => {
        if (error) {
            return callback({state:false,documentos:[],error:error})
        }
        else{
            return callback({state:true,documentos:documentos})
        }
    })
}

reportesModel.actualizar = function(post,callback){

    MyModel.findOneAndUpdate({identificacion:post.identificacion},{
        identificacion:post.identificacion,
        nombres:post.nombres,
        apellidos:post.apellidos,
        deuda:post.deuda
    },(error,modificacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al actualizar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Reporte actualizado"})
        }
    })
}

reportesModel.eliminar = function(post,callback){

    MyModel.findOneAndDelete({identificacion:post.identificacion},(error,eliminacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al eliminar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Reporte eliminado"})
        }
    })
}


module.exports.reportesModel = reportesModel