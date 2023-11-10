const { response } = require('express')

var reportesModel = require('../modelos/reportesModel.js').reportesModel
var reportesController = {}

reportesController.guardar = function(request,response){

    var post = {
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        identificacion:request.body.identificacion,
        deuda:request.body.deuda,
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
    
    if(post.deuda == undefined || post.deuda == null || post.deuda == ""){
        response.json({state:false,mensaje:"el campo deuda es obligatorio"})
        return false
    }
    
    if(post.deuda.length > 0){
        if(Number.isInteger(parseInt(post.deuda)) == false){
            response.json({state:false,mensaje:"el campo deuda debe ser numerico"})
            return false
        }
    }
    
    reportesModel.validarIdentificacion(post,function(res) {
        if (res.state == false) {
            response.json({state:false,mensaje:"Error al consultar en la base de datos"})
            return false
        }


        if(res.continuar == true){
            //guardar
            reportesModel.guardar(post,function(respuesta){
                response.json(respuesta)
            })
        }
        else{
            response.json({state:false,mensaje:"el Reporte ya fue creado, intente con otro"})
    
        }
    })
}

reportesController.cargardatos = function(request,response){
    reportesModel.cargardatos(null,function(respuesta){
        response.json(respuesta)

    })
}

reportesController.cargarid = function(request,response){
    var post = {
        id: request.body.id,
    }
    if (post.id == undefined || post.id == null || post.id == "") {
        response.json({state:false,mensaje:"el campo id  es obligatorio"})
        return false
    }
    reportesModel.cargarid(post, function(respuesta){
        response.json(respuesta)
    })
}

reportesController.actualizar = function(request,response){
    var post = {
        identificacion:request.body.identificacion,
        nombres:request.body.nombres,
        apellidos:request.body.apellidos,
        deuda:request.body.deuda,
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

    
    if(post.deuda == undefined || post.deuda == null || post.deuda == ""){
        response.json({state:false,mensaje:"el campo deuda es obligatorio"})
        return false
    }
    
    if(post.deuda.length > 0){
        if(Number.isInteger(parseInt(post.deuda)) == false){
            response.json({state:false,mensaje:"el campo deuda debe ser numerico"})
            return false
        }
    }

    reportesModel.actualizar(post,function(respuesta){
                response.json(respuesta)
    })

}

reportesController.eliminar = function(request,response){
    var post ={
        identificacion:request.body.identificacion,
    }
    if(post.identificacion == undefined || post.identificacion == null || post.identificacion == ""){
        response.json({state:false,mensaje:"el campo identificacion es obligatorio"})
        return false
    }

    



    reportesModel.eliminar(post,function(respuesta){
        response.json(respuesta)
    })

}

module.exports.reportesController = reportesController