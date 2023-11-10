const { response } = require('express')

var solicitarModel = require('../modelos/solicitarModel.js').solicitarModel
var solicitarController = {}

solicitarController.guardar = function(request,response){

    var post = {
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        identificacion:request.body.identificacion,
        correo:request.body.correo,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        ingresos:request.body.ingresos,

        
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

    if ( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i .test(post.correo) ==false) {
        response.json({state:false,mensaje:"la direccion de email no es valida"})
        return false
    }

    if (post.direccion == undefined || post.direccion == null || post.direccion == "") {
        response.json({state:false,mensaje:"el campo direccion  es obligatorio"})
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






    
    
    



    
    solicitarModel.validarIdentificacion(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == true){
            //guardar
            solicitarModel.guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"el usuario ya fue creado, intente con otro"})
    
        }
    })
}

solicitarController.cargardatos = function(request,response){
    solicitarModel.cargardatos(null,function(respuesta){
        response.json(respuesta)

    })
}

solicitarController.actualizar = function(request,response){
    var post = {
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        identificacion:request.body.identificacion,
        correo:request.body.correo,
        direccion:request.body.direccion,
        telefono:request.body.telefono,
        ingresos:request.body.ingresos,
        
        

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

    if ( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i .test(post.correo) ==false) {
        response.json({state:false,mensaje:"la direccion de email no es valida"})
        return false
    }

    if (post.direccion == undefined || post.direccion == null || post.direccion == "") {
        response.json({state:false,mensaje:"el campo direccion  es obligatorio"})
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

    

    solicitarModel.validarIdentificacion(post,function(existe){
        if(existe.continuar == false){
            //eliminar
            solicitarModel.actualizar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El Usuario no existe en la base de datos"})
        }
    })
}

solicitarController.eliminar = function(request,response){
    var post ={
        identificacion:request.body.identificacion,
    }
    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    


    solicitarModel.validarIdentificacion(post,function(existe){
        if(existe.continuar == false){
            //eliminar
            solicitarModel.eliminar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El usuario no existe en la base de datos"})
        }
    })
}

solicitarController.login = function(request,response){

    var post = {
        correo:request.body.correo,
        password:request.body.password,
        
        
    }

    if(post.correo == undefined || post.correo == null || post.correo == ""){
        response.json({state:false,mensaje:"El campo Email es obligatorio"})
        return false
    }

    if ( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i .test(post.correo) ==false) {
        response.json({state:false,mensaje:"La direccion de email no es valida"})
        return false
    }

    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false,mensaje:"El campo contraseña es obligatorio"})
        return false
    }
    
    

   
    
    solicitarModel.validarcorreo(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == false){
            solicitarModel.login(post, function(respuesta){
                if (respuesta.documentos.length > 0) {
                    console.log(respuesta.documentos)
                request.session.identificacion = respuesta.documentos[0].identificacion
                request.session.rol = respuesta.documentos[0].rol
                request.session.nombres = respuesta.documentos[0].nombres + " " + respuesta.documentos[0].apellidos
                response.json({state:true,mensaje:"Bienvenido: " + request.session.nombres,datos:request.session })
                }
                else{
                    response.json({state:false,mensaje:"Credenciales Incorrectas" })
                }
                
            })
        }
        else{
            response.json({state:false,mensaje:"El email no existe"})
    
        }
    })
}
module.exports.solicitarController = solicitarController