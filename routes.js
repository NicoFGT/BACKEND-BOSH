var usuariosController = require('./controladores/usuariosController.js').usuariosController

var exigelogin = function(request,response,next){
    if(request.session.rol == undefined || request.session.rol == "" || request.session.rol == null){
        response.json({state:false,mensaje:"Se requiere iniciar sesion"})
    }
    else{
        next()
    }
}

var soloadministradores = function(request,response,next){
    if (request.session.rol == 1) {
        next()
    }
    else{
        response.json({state:false,mensaje:"Se requieren permisos de administrador"})
    }
}


app.post("/usuarios/guardar", function(request, response){
    usuariosController.guardar(request,response)
})

app.post("/usuarios/cargardatos", function(request, response){
    usuariosController.cargardatos(request,response)
})

app.post("/usuarios/actualizar",exigelogin,soloadministradores, function(request, response){
    usuariosController.actualizar(request,response)
})

app.post("/usuarios/eliminar",exigelogin,soloadministradores, function(request, response){
    usuariosController.eliminar(request,response)
})

app.post("/usuarios/login", function(request, response){
    usuariosController.login(request,response)
})

app.post("/usuarios/status", function(request, response){
    response.json(request.session)
})
app.post("/usuarios/logout",exigelogin, function(request, response){
    request.session.destroy()
    response.json({state:true,mensaje:"Su sesion se ha cerrado"})
})

var listaController = require('./controladores/listaController.js').listaController


app.post("/lista/guardar",exigelogin,soloadministradores, function(request, response){
    listaController.guardar(request,response)
})

app.post("/lista/cargardatos",exigelogin,soloadministradores, function(request, response){
    listaController.cargardatos(request,response)
})

app.post("/lista/cargarid",exigelogin,soloadministradores, function(request, response){
    listaController.cargarid(request,response)
})

app.post("/lista/actualizar",exigelogin,soloadministradores, function(request, response){
    listaController.actualizar(request,response)
})

app.post("/lista/eliminar",exigelogin,soloadministradores, function(request, response){
    listaController.eliminar(request,response)
})

var reportesController = require('./controladores/reportesController.js').reportesController


app.post("/reportes/guardar",exigelogin,soloadministradores, function(request, response){
    reportesController.guardar(request,response)
})

app.post("/reportes/cargardatos",exigelogin,soloadministradores, function(request, response){
    reportesController.cargardatos(request,response)
})

app.post("/reportes/cargarid",exigelogin,soloadministradores, function(request, response){
    reportesController.cargarid(request,response)
})

app.post("/reportes/actualizar",exigelogin,soloadministradores, function(request, response){
    reportesController.actualizar(request,response)
})

app.post("/reportes/eliminar",exigelogin,soloadministradores, function(request, response){
    reportesController.eliminar(request,response)
})

var solicitarController = require('./controladores/solicitarController.js').solicitarController


app.post("/solicitar/guardar", function(request, response){
    solicitarController.guardar(request,response)
})

app.post("/solicitar/cargardatos", function(request, response){
    solicitarController.cargardatos(request,response)
})

app.post("/solicitar/cargarid", function(request, response){
    solicitarController.cargarid(request,response)
})

app.post("/solicitar/actualizar", function(request, response){
    solicitarController.actualizar(request,response)
})

app.post("/solicitar/eliminar", function(request, response){
    solicitarController.eliminar(request,response)
})