const { response } = require('express')

var usuariosModel = require('../modelos/usuariosModel.js').usuariosModel
var usuariosController = {}

usuariosController.guardar = function(request,response){

    var post = {
        codigo:request.body.codigo,
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        precio:request.body.precio,
        

    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false,mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == "") {
        response.json({state:false,mensaje:"el campo descripcion es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null){
        response.json({state:false,mensaje:"el campo precio es obligatorio"})
        return false
    }

    if(post.precio.length > 0){
        if(Number.isInteger(parseInt(post.precio)) == false){
            response.json({state:false,mensaje:"el campo precio debe ser numerico"})
            return false
        }
    }

    
    usuariosModel.validarCodigo(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == true){
            //guardar
            usuariosModel.guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"el producto ya fue creado, registre otro"})
    
        }
    })
}

usuariosController.cargardatos = function(request,response){
    usuariosModel.cargardatos(null,function(respuesta){
        response.json(respuesta)

    })
}

usuariosController.actualizar = function(request,response){
    var post ={
        codigo:request.body.codigo, //busqueda
        nombre:request.body.nombre,
        descripcion:request.body.descripcion,
        precio:request.body.precio,
    }

    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false,mensaje:"el campo codigo es obligatorio"})
        return false
    }

    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false,mensaje:"el campo nombre es obligatorio"})
        return false
    }
    
    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == "") {
        response.json({state:false,mensaje:"el campo descripcion es obligatorio"})
        return false
    }

    if(post.precio == undefined || post.precio == null){
        response.json({state:false,mensaje:"el campo precio es obligatorio"})
        return false
    }

    if(post.precio.length > 0){
        if(Number.isInteger(parseInt(post.precio)) == false){
            response.json({state:false,mensaje:"el campo precio debe ser numerico"})
            return false
        }
        // else{
        //     if(post.telefono.length != 10){
        //         response.json({state:false,mensaje:"el campo telefono debe tener 10 digitos"})
        //         return false
        //     }
        // }
    }


    usuariosModel.validarCodigo(post,function(existe){
        if(existe.continuar == false){
            //actualizar
            usuariosModel.actualizar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El producto no se encuenra registrado en la base de datos"})
        }
    })
}

usuariosController.eliminar = function(request,response){
    var post ={
        codigo:request.body.codigo,
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false,mensaje:"el campo codigo es obligatorio"})
        return false
    }

    


    usuariosModel.validarCodigo(post,function(existe){
        if(existe.continuar == false){
            //eliminar
            usuariosModel.eliminar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El producto no existe en la base de datos"})
        }
    })
}
module.exports.usuariosController = usuariosController