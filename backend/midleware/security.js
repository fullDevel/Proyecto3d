var security = {}

    security.Soloadmin = function(request,response,next){
    console.log(request.originalUrl)
    console.log(request.originalrol)
    var rol = request.session.usu_rol

    if(rol == undefined || rol == null || rol == ""){
        response.json({state:false, mensaje:"Debe iniciar sesion"})
        return false
    }
    else{
        if(rol=="Administrador"){
            next()
        }else{
            response.json({state:false, mensaje:"Esta api esta hecha solo para administradores"})
        }
    }    
}

module.exports.security = security
