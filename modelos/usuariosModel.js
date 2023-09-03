var usuariosModel = {}
const mongoose = require("mongoose")
const Schema = mongoose.Schema
var ProductosSchema = new Schema ({
    codigo:String,
    nombre:String,
    descripcion:String,
    precio:Number
})

const MyModel = mongoose.model("Productos", ProductosSchema)

usuariosModel.validarCodigo = function(post,callback){
    MyModel.find({codigo:post.codigo},{},(error, documentos) => {
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


    // var posicion = datos.findIndex ((item) => item.identificacion == post.identificacion)
    // if(posicion == -1){
    //     return callback({continuar:true}) //no encontro la identificacion
    // }
    // else{
    //     return callback({continuar:false}) //encontro la identificacion
    // }
}

usuariosModel.guardar = function(post,callback){

    const instancia = new MyModel
    instancia.codigo = post.codigo 
    instancia.nombre = post.nombre
    instancia.descripcion = post.descripcion
    instancia.precio = post.precio

    instancia.save((error, creado)=>{
        if (error) {
           console.log(error)
           return callback({state:false}) 
        }
        else{
            return callback({state:true,mensaje:"Producto guardado"})
        }
    })

    // datos.push({
    //     identificacion:post.identificacion,
    //     pnombre:post.pnombre,
    //     snombre:post.snombre,
    //     papellido:post.papellido,
    //     sapellido:post.sapellido,
    //     telefono:post.telefono,
    //     email:post.email
    // })

    // return callback ({state:true,mensaje:"Usuario guardado"})
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
    // return callback({state:true,datos:datos})
}

usuariosModel.actualizar = function(post,callback){

    MyModel.findOneAndUpdate({codigo:post.codigo},{
        codigo:post.codigo,
        nombre:post.nombre,
        descripcion:post.descripcion,
        precio:post.precio
    },(error,modificacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al actualizar",error:error})
        }
        else{
            return callback({state:true,mensaje:"usuario actualizado"})
        }
    })
    // var posicion = datos.findIndex ((item) => item.identificacion == post.identificacion)

    // datos[posicion].pnombre = post.pnombre
    // datos[posicion].snombre = post.snombre
    // datos[posicion].papellido = post.papellido
    // datos[posicion].sapellido = post.sapellido
    // datos[posicion].telefono = post.telefono
    // datos[posicion].email = post.email

    // return callback({state:true,mensaje:"usuario actualizado"})
}

usuariosModel.eliminar = function(post,callback){

    MyModel.findOneAndDelete({codigo:post.codigo},(error,eliminacion) => {
        if (error) {
            return callback({state:false,mensaje:"se presento un error al eliminar",error:error})
        }
        else{
            return callback({state:true,mensaje:"Producto eliminado"})
        }
    })
    // var posicion = datos.findIndex ((item) => item.identificacion == post.identificacion)

    // datos.splice(posicion,1)

    // return callback({state:true,mensaje:"usuario eliminado"})
}


module.exports.usuariosModel = usuariosModel