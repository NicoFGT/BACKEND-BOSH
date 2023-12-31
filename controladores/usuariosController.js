const { response } = require('express')

var usuariosModel = require('../modelos/usuariosModel.js').usuariosModel
var usuariosController = {}

usuariosController.guardar = function(request,response){

    var post = {
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        identificacion:request.body.identificacion,
        correo:request.body.correo,
        password:request.body.password,
        password2:request.body.password2,
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

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ .test(post.password) ==false) {
        response.json({state:false,mensaje:"El password debe contener al menos una minúscula, mayúscula, número y un carácter especial. Y 8 carácteres como mínimo"})
        return false
    }
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ .test(post.password2) ==false) {
        response.json({state:false,mensaje:"Las contraseñas deben coincidir"})
        return false
    }

    if (post.password != post.password2) {
        response.json({state:false,mensaje:"Las contraseñas deben coincidir"})
        return false
    }
    else{
        if (post.password != post.password2) {
            response.json({state:true,mensaje:"Las contraseñas deben coincidir"})
            return false
        }
    }

    
    
    



    
    usuariosModel.validarIdentificacion(post,function(res) {
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
            response.json({state:false,mensaje:"el usuario ya fue creado, intente con otro"})
    
        }
    })
}

usuariosController.cargardatos = function(request,response){
    usuariosModel.cargardatos(null,function(respuesta){
        response.json(respuesta)

    })
}

usuariosController.actualizar = function(request,response){
    var post = {
        identificacion:request.body.identificacion,
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        correo:request.body.correo,
        password:request.body.password,
        

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

    if (/^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ .test(post.password) ==false) {
        response.json({state:false,mensaje:"El password debe contener al menos una minúscula, mayúscula, número y un carácter especial. Y 8 carácteres como mínimo"})
        return false

    }

    usuariosModel.validarIdentificacion(post,function(existe){
        if(existe.continuar == false){
            //eliminar
            usuariosModel.actualizar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El Usuario no existe en la base de datos"})
        }
    })
}

usuariosController.eliminar = function(request,response){
    var post ={
        identificacion:request.body.identificacion,
    }
    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    


    usuariosModel.validarIdentificacion(post,function(existe){
        if(existe.continuar == false){
            //eliminar
            usuariosModel.eliminar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"El usuario no existe en la base de datos"})
        }
    })
}

usuariosController.login = function(request,response){

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
    
    

   
    
    usuariosModel.validarcorreo(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == false){
            usuariosModel.login(post, function(respuesta){
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
module.exports.usuariosController = usuariosController