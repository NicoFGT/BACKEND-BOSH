var usuariosController = require('./controladores/usuariosController.js').usuariosController


app.post("/producto/guardar", function(request, response){
    usuariosController.guardar(request,response)
})

app.post("/producto/cargardatos", function(request, response){
    usuariosController.cargardatos(request,response)
})

app.post("/producto/actualizar", function(request, response){
    usuariosController.actualizar(request,response)
})

app.post("/producto/eliminar", function(request, response){
    usuariosController.eliminar(request,response)
})