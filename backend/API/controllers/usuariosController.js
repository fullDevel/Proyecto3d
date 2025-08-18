//Rutas de importacion
const usuariosModel = require('../models/usuariosModel.js').usuariosModel
const config = require('../../config.js').config


//Definicion de OBJETO
var usuariosController = {}

//CRUD 
usuariosController.Guardar = function (request, response) {
    var post = {
        usu_nombre: request.body.usu_nombre,
        usu_email: request.body.usu_email,
        usu_password: request.body.usu_password,
        usu_rol: request.body.usu_rol,
        usu_estado: request.body.usu_estado
    }

    if (post.usu_nombre == undefined || post.usu_nombre == null || post.usu_nombre.trim() == "") {
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }
    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    if (post.usu_password == undefined || post.usu_password == null || post.usu_password.trim() == '') {
        response.json({ state: false, mensaje: 'El campo password es obligatorio' })
        return false
    }
    const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex_Email.test(post.usu_email) == false) {
        response.json({ state: false, mensaje: 'Campo email incorrecto' })
        return false
    }
    if (post.usu_rol == undefined || post.usu_rol == null || post.usu_rol.trim() == '') {
        response.json({ state: false, mensaje: 'El campo rol es obligatorio' })
        return false
    }

    post.usu_password = sha256(post.usu_password + config.claveSecreta)

    usuariosModel.ExisteEmail(post, function (existe) {
        if (existe.length == 0) {
            usuariosModel.Guardar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: 'Usuario Guardado', data: [] })
                } else {
                    response.json({ state: false, mensaje: 'Error al guardar' })
                }
            })
        } else {
            response.json({ state: false, mensaje: "Email ya existe, Intente con otro" })
        }
    })
}

usuariosController.CargarTodos = function (request, response) {
    usuariosModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

usuariosController.Actualizar = function (request, response) {
    var post = {
        usu_id: request.body.usu_id,
        usu_nombre: request.body.usu_nombre,
        usu_estado: request.body.usu_estado,
        usu_rol: request.body.usu_rol
    }
    if (post.usu_nombre == undefined || post.usu_nombre == null || post.usu_nombre.trim() == '') {
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }
    if (post.usu_estado == undefined || post.usu_estado == null || post.usu_estado.trim() == '') {
        response.json({ state: false, mensaje: 'El campo estado es obligatorio' })
        return false
    }
    if (post.usu_rol == undefined || post.usu_rol == null || post.usu_rol.trim() == '') {
        response.json({ state: false, mensaje: 'El campo rol es obligatorio' })
        return false
    }

    if (post.usu_id.length != 24) {
        response.json({ state: false, mensaje: 'Longitud del id incorrecta' })
        return false
    }

    usuariosModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El ID no existe en la base de datos" })
            return false
        }
        else {
            console.log('Actualizar1')
            usuariosModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: 'Usuario actualizado', data: [] })
                } else {
                    response.json({ state: false, mensaje: 'Error al actualizar' })
                }
            })
        }
    })
}

usuariosController.Eliminar = function (request, response) {
    var post = {
        usu_id: request.body.usu_id,
    }
    console.log(request.body.usu_id)
    console.log("eliminar por id")
    console.log(post.usu_id)
    if (post.usu_id == undefined || post.usu_id == null || post.usu_id.trim() == '') {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }

    if (post.usu_id.length != 24) {
        response.json({ state: false, mensaje: 'Longitud del id incorrecta' })
        return false
    }

    usuariosModel.Eliminar(post, function (respuesta) {
        if (respuesta.state == true) {
            response.json({ state: true, mensaje: 'Se eliminó el usuario' })
        } else {
            response.json({ state: false, mensaje: 'Error al eliminar usuario' })
        }
    })
}

usuariosController.CargarId = function (request, response) {
    var post = {
        usu_id: request.body.usu_id
    }

    if (post.usu_id == undefined || post.usu_id == null || post.usu_id.trim() == "") {
        response.json({ state: false, mensaje: 'El campo id es obligatorio' })
        return false
    }
    if (post.usu_id.length != 24) {
        response.json({ state: false, mensaje: 'Longitud del id incorrecta' })
        return false
    }
    usuariosModel.CargarId(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.datos.length > 0 ) {
            response.json({ state: true, datos: respuesta })
        } else { response.json({ state: false, mensaje: 'ID no encontrado' }) }
    })
}

usuariosController.Registrar = function (request, response) {
    var post = {
        usu_nombre: request.body.usu_nombre,
        usu_email: request.body.usu_email,
        usu_password: request.body.usu_password
    }
    console.log(post)
    if (post.usu_nombre == undefined || post.usu_nombre == null || post.usu_nombre.trim() == '') {
        console.log('Valicaion 1')
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }
    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        console.log('Valicaion 2')
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    if (post.usu_password == undefined || post.usu_password == null || post.usu_password.trim() == '') {
        response.json({ state: false, mensaje: 'El campo password es obligatorio' })
        return false
    }
    const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex_Email.test(post.usu_email) == false) {
        response.json({ state: false, mensaje: 'Campo email incorrecto' })
        return false
    }



    post.usu_password = sha256(post.usu_password + config.claveSecreta)

    var numAzar = 'G-' + Math.floor(Math.random() * (9999 - 1000) + 1000)

    post.usu_codigo = numAzar

    usuariosModel.ExisteEmail(post, function (existe) {
        if (existe.length == 0) {
            usuariosModel.Registrar(post, function (respuesta) {
                if (respuesta.state == true) {
                    // Enviar correo electronico
                    //transportador
                    const transporter = nodemailer.createTransport({
                        host: config.email.host,
                        port: config.email.port,
                        secure: false,
                        requireTLS: true,
                        auth: {
                            user: config.email.user,
                            pass: config.email.pass
                        }
                    })

                    var mailOptions = {
                        from: config.email.user,
                        to: post.usu_email,
                        subject: 'Verifica tu cuenta con el codigo ' + numAzar,
                        html: `
                                <body style="font-family: Arial, sans-serif; background-color: #121212; padding: 20px; text-align: center; color: #ffffff;">

                                <div style="max-width: 500px; margin: 0 auto; background-color: #1e1e1e; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(255,255,255,0.05);">
                                    <h2 style="color: #ffffff;">Bienvenido a <span style="color: #4dabf7;">${config.name}</span></h2>

                                    <p style="font-size: 16px; color: #cccccc;">
                                    Usa el siguiente código para activar tu cuenta:
                                    </p>

                                    <input value="${numAzar}"
                                    style="margin: 20px auto; padding: 15px 20px; background-color: #2a2a2a; border: 1px solid #4dabf7; border-radius: 6px; font-size: 24px; font-weight: bold; color: #4dabf7; width: fit-content;">
                                    </input>

                                    <a target="_blank" href="${config.dominio}/activar/${post.usu_email}/${numAzar}"
                                    style="display: inline-block; margin-top: 25px; background-color: #4dabf7; color: #121212; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                                    Activar Cuenta
                                    </a>

                                    <p style="font-size: 14px; color: #777; margin-top: 20px;">
                                    Si no solicitaste esta activación, puedes ignorar este mensaje.
                                    </p>
                                </div>

                                </body>
                        `

                    }

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            response.json({ state: false, mensaje: 'Error al enviar correo electronico' })
                        } else {
                            response.json({ state: true, mensaje: 'Usuario registrado correctamente, verifique su bandeja para activar su cuenta ', data: [] })
                        }
                    })


                } else {
                    response.json({ state: false, mensaje: 'Error al registrar' })
                }
            })
        } else {
            response.json({ state: false, mensaje: 'Error al registrar' })
        }
    })
}

usuariosController.Login = function (request, response) {
    var post = {
        usu_email: request.body.usu_email,
        usu_password: request.body.usu_password
    }

    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    if (post.usu_password == undefined || post.usu_password == null || post.usu_password.trim() == '') {
        response.json({ state: false, mensaje: 'El campo password es obligatorio' })
        return false
    }
    const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex_Email.test(post.usu_email) == false) {
        response.json({ state: false, mensaje: 'Campo email incorrecto' })
        return false
    }

    post.usu_password = sha256(post.usu_password + config.claveSecreta)
    console.log(post)
    usuariosModel.Login(post, function (respuesta) {
        console.log(respuesta.datos.length)
        if (respuesta.datos.length == 0) {
            response.json({ state: false, mensaje: 'Credenciales invalidas' })
            return false
        } else {
            if (respuesta.datos[0].usu_estado == 'Inactivo') {
                response.json({ state: false, mensaje: 'Debe activar su cuenta, verifique su email' })
                return false
            } 
            
            if(respuesta.datos[0].usu_estado == 'Baneado') {
                response.json({ state: false, mensaje: 'Su cuenta ha sido baneada' })
                return false
            } 
            if(respuesta.datos[0].usu_estado == 'Activo') {
                request.session.usu_rol = respuesta.datos[0].usu_rol
                request.session.usu_nombre = respuesta.datos[0].usu_nombre
                request.session.usu_email = respuesta.datos[0].usu_email
                request.session.usu_id = respuesta.datos[0]._id               

                response.json({ state: true, mensaje: 'Bienvenido ' + respuesta.datos[0].usu_nombre })
            }

        }
    })

}

usuariosController.Activar = function (request, response) {
    var post = {
        usu_email: request.body.usu_email,
        usu_codigoact: request.body.usu_codigoact
    }
    console.log(post)
    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        console.log('Valicaion 1')
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    if (post.usu_codigoact == undefined || post.usu_codigoact == null || post.usu_codigoact.trim() == '') {
        console.log('Valicaion 2')
        response.json({ state: false, mensaje: 'El codigo de acgivacion es obligatorio' })
        return false
    }



    usuariosModel.Activar(post, function (respuesta) {
        if (respuesta == null) {
            response.json({ state: false, mensaje: 'Codigo de activacion o email inválido' })
        } else {
            response.json({ state: true, mensaje: 'Cuenta activada correctamente' })
        }
    })

}

usuariosController.SolicitudRecuperarPassword = function (request, response) {
    var post = {
        usu_email: request.body.usu_email
    }

    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex_Email.test(post.usu_email) == false) {
        response.json({ state: false, mensaje: 'Campo email incorrecto' })
        return false
    }

    var numAzar = 'R-' + Math.floor(Math.random() * (9999 - 1000) + 1000)

    post.usu_codigorec = numAzar
    usuariosModel.SolicitudRecuperarPassword(post, function (respuesta) {
        const transporter = nodemailer.createTransport({
            host: config.email.host,
            port: config.email.port,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.email.user,
                pass: config.email.pass
            }
        })

        var mailOptions = {
            from: config.email.user,
            to: post.usu_email,
            subject: 'Con este codigo recupera tu contraseña  ' + numAzar,
            html: `
                                <body style="font-family: Arial, sans-serif; background-color: #121212; padding: 20px; text-align: center; color: #ffffff;">

                                <div style="max-width: 500px; margin: 0 auto; background-color: #1e1e1e; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(255,255,255,0.05);">
                                    <h2 style="color: #ffffff;">Bienvenido a <span style="color: #4dabf7;">${config.name}</span></h2>

                                    <p style="font-size: 16px; color: #cccccc;">
                                    Usa el siguiente código para recuperar tu cuenta:
                                    </p>

                                    <input value="${numAzar}"
                                    style="margin: 20px auto; padding: 15px 20px; background-color: #2a2a2a; border: 1px solid #4dabf7; border-radius: 6px; font-size: 24px; font-weight: bold; color: #4dabf7; width: fit-content;">
                                    </input>


                                    <p style="font-size: 14px; color: #777; margin-top: 20px;">
                                    Si no solicitaste esta activación, puedes ignorar este mensaje.
                                    </p>
                                </div>

                                </body>
                        `

        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                response.json({ state: false, mensaje: 'Error al enviar correo electronico' })
            } else {
                response.json({ state: true, mensaje: 'Hemos enviado el codigo de recuperacion de contraseña a tu bandeja ', data: [] })
            }
        })

    })


}

usuariosController.RecuperarPassword = function (request, response) {
    var post = {
        usu_email: request.body.usu_email,
        usu_codigorec: request.body.usu_codigorec,
        usu_password: request.body.usu_password
    }
    if (post.usu_codigorec == undefined || post.usu_codigorec == null || post.usu_codigorec.trim() == '') {
        response.json({ state: false, mensaje: 'El campo codigo recuperacion es obligatorio' })
        return false
    }
    if (post.usu_password == undefined || post.usu_password == null || post.usu_password.trim() == '') {
        response.json({ state: false, mensaje: 'El campo password es obligatorio' })
        return false
    }
    if (post.usu_email == undefined || post.usu_email == null || post.usu_email.trim() == '') {
        response.json({ state: false, mensaje: 'El campo email es obligatorio' })
        return false
    }
    const regex_Email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex_Email.test(post.usu_email) == false) {
        response.json({ state: false, mensaje: 'Campo email incorrecto' })
        return false
    }

    post.usu_password = sha256(post.usu_password + config.claveSecreta)

    usuariosModel.RecuperarPassword(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta == null) {
            response.json({ state: false, mensaje: 'Codigo de recuperación o email inválidos' })
            return false
        } else {
            response.json({ state: true, mensaje: 'Password actualizada' })
        }

    })
}

usuariosController.ActualizarPass = function(request,response){
    var post ={
        usu_password:request.body.usu_password,
        usu_id:request.session.usu_id
    }

    if(post.usu_password == undefined || post.usu_password == null || post.usu_password == ''){
        response.json({ state: false, mensaje: 'El campo password es obligatorio' })
        return false
    }

    if(post.usu_id == undefined || post.usu_id == null || post.usu_id == ''){
        response.json({ state: false, mensaje: 'Debe iniciar sesion para cambiar el password' })
        return false
    }


    post.usu_password = sha256(post.usu_password + config.claveSecreta)


    usuariosModel.ActualizarPass(post,function(respuesta){
        console.log(respuesta)
        request.session.destroy()
        response.json({state:true,mensaje:"Su password se ha actualizado, inicie sesion nuevamente"})

    })

}

usuariosController.CargarMisDatos = function(request,response){
       var post = {
        usu_id: request.session.usu_id
    }

    if (post.usu_id == undefined || post.usu_id == null || post.usu_id.trim() == "") {
        response.json({ state: false, mensaje: 'Debe iniciar sesion para cargar los datos' })
        return false
    }

    usuariosModel.CargarId(post, function (respuesta) {
        console.log(respuesta)
        if (respuesta.datos.length > 0 ) {
            response.json({ state: true, datos: respuesta })
        } else { response.json({ state: false, mensaje: 'ID no encontrado' }) }
    })


}

usuariosController.ActualizarMisDatos = function(request,response){
    var post = {
        usu_id: request.session.usu_id,
        usu_nombre:request.body.usu_nombre
    }

    if (post.usu_id == undefined || post.usu_id == null || post.usu_id.trim() == '') {
        response.json({ state: false, mensaje: 'Debe iniciar sesion para actualizar los datos' })
        return false
    }

    if (post.usu_nombre == undefined || post.usu_nombre == null || post.usu_nombre.trim() == '') {
        response.json({ state: false, mensaje: 'El campo nombre es obligatorio' })
        return false
    }

    usuariosModel.ActualizarMisDatos(post,function(respuesta){
        if(respuesta.state == true){
            response.json({state:true,mensaje:"Se han actualizado sus datos"})
        }else{
            response.json({state:false,mensaje:"Se presnetó un error al actualizar los datos"})
        }
    })


}
//Ruta de exportacion
module.exports.usuariosController = usuariosController