const { response } = require('express')

var listaModel = require('../modelos/listaModel.js').listaModel
var listaController = {}

listaController.guardar = function(request,response){

    var post = {
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        identificacion:request.body.identificacion,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        ingresos:request.body.ingresos,
        correo:request.body.correo,
    }

    if(post.nombres == undefined || post.nombres == null || post.nombres == ""){
        response.json({state:false,mensaje:"el campo nombres es obligatorio"})
        return false
    }

    if (post.apellidos == undefined || post.apellidos == null || post.apellidos == "") {
        response.json({state:false,mensaje:"el campo apellidos  es obligatorio"})
        return false
    }

    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    if(post.direccion == undefined || post.direccion == null){
        response.json({state:false,mensaje:"el campo direccion es obligatorio"})
        return false
    }

    if(post.telefono == undefined || post.telefono == null){
        response.json({state:false,mensaje:"el campo telefono es obligatorio"})
        return false
    }

    if(post.telefono.length != 0){
        if(Number.isInteger(parseInt(post.telefono)) == false){
            response.json({state:false,mensaje:"el campo telefono debe ser numerico"})
            return false
        }
        else{
        
              if(post.telefono.length != 10){
                 response.json({state:false,mensaje:"el campo telefono debe tener 10 digitos"})
                 return false
                }
        }
    }
    
    if(post.ingresos == undefined || post.ingresos == null || post.ingresos == ""){
        response.json({state:false,mensaje:"el campo ingresos es obligatorio"})
        return false
    }
    
    if(post.ingresos.length > 0){
        if(Number.isInteger(parseInt(post.ingresos)) == false){
            response.json({state:false,mensaje:"el campo ingresos debe ser numerico"})
            return false
        }
    }

    if ( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i .test(post.correo) ==false) {
        response.json({state:false,mensaje:"la direccion de email no es valida"})
        return false
    }

    
    listaModel.validarIdentificacion(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == true){
            //guardar
            listaModel.guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"el usuario ya fue creado, intente con otro"})
    
        }
    })
}

listaController.cargardatos = function(request,response){
    listaModel.cargardatos(null,function(respuesta){
        response.json(respuesta)

    })
}

listaController.cargarid = function(request,response){
    var post = {
        id: request.body.id,
    }
    if (post.id == undefined || post.id == null || post.id == "") {
        response.json({state:false,mensaje:"el campo id  es obligatorio"})
        return false
    }
    listaModel.cargarid(post, function(respuesta){
        response.json(respuesta)
    })
}

listaController.actualizar = function(request,response){
    var post = {
        identificacion:request.body.identificacion,
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        ingresos:request.body.ingresos,
        correo:request.body.correo,
        
        

    }

    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    if(post.nombres == undefined || post.nombres == null || post.nombres == ""){
        response.json({state:false,mensaje:"el campo nombres es obligatorio"})
        return false
    }
    
    if (post.apellidos == undefined || post.apellidos == null || post.apellidos == "") {
        response.json({state:false,mensaje:"el campo apellidos  es obligatorio"})
        return false
    }

    if(post.direccion == undefined || post.direccion == null){
        response.json({state:false,mensaje:"el campo direccion es obligatorio"})
        return false
    }

    if(post.telefono == undefined || post.telefono == null){
        response.json({state:false,mensaje:"el campo telefono es obligatorio"})
        return false
    }

    if(post.telefono.length != 0){
        if(Number.isInteger(parseInt(post.telefono)) == false){
            response.json({state:false,mensaje:"el campo telefono debe ser numerico"})
            return false
        }
        else{
        
              if(post.telefono.length != 10){
                 response.json({state:false,mensaje:"el campo telefono debe tener 10 digitos"})
                 return false
                }
        }
    }
    
    if(post.ingresos == undefined || post.ingresos == null || post.ingresos == ""){
        response.json({state:false,mensaje:"el campo ingresos es obligatorio"})
        return false
    }
    
    if(post.ingresos.length > 0){
        if(Number.isInteger(parseInt(post.ingresos)) == false){
            response.json({state:false,mensaje:"el campo ingresos debe ser numerico"})
            return false
        }
    }

    if ( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i .test(post.correo) ==false) {
        response.json({state:false,mensaje:"la direccion de email no es valida"})
        return false
    }


    listaModel.actualizar(post,function(respuesta){
                response.json(respuesta)
    })

}

listaController.eliminar = function(request,response){
    var post ={
        identificacion:request.body.identificacion,
    }
    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    



    listaModel.eliminar(post,function(respuesta){
        response.json(respuesta)
    })

}

module.exports.listaController = listaController