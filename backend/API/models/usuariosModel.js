const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var usuariosSchema = new Schema({
    usu_nombre: String,
    usu_email: String,
    usu_rol: String,
    usu_password: String,
    usu_estado: String,
    usu_codigoact: String,
    usu_codigorec: String,
    usu_ciudad: String,
    usu_barrio: String,
    usu_calle: String,
    usu_carrera: String,
    usu_num: String,
    usu_complemento: String

})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("usuarios", usuariosSchema)

//Definicion de objetos
var usuariosModel = {}

//Definicion de Array de datos
var datos = []

// 

usuariosModel.Guardar = function (post, callback) {
    const instancia = new Mymodel
    instancia.usu_nombre = post.usu_nombre
    instancia.usu_rol = post.usu_rol
    instancia.usu_email = post.usu_email
    instancia.usu_password = post.usu_password
    instancia.usu_estado = post.usu_estado

    instancia.save().then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })

}

usuariosModel.CargarTodos = function (post, callback) {
    Mymodel.find({}, { __v: 0, usu_password: 0 }).then((respuesta) => {
        return callback({ state: true, datos: respuesta })
    })

}

usuariosModel.Actualizar = function (post, callback) {
    Mymodel.findByIdAndUpdate({ _id: post.usu_id }, {
        usu_nombre: post.usu_nombre,
        usu_rol: post.usu_rol,
        usu_estado: post.usu_estado
    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })

}

usuariosModel.Eliminar = function (post, callback) {
    Mymodel.findByIdAndDelete({ _id: post.usu_id }).then((respuesta) => {
        console.log(respuesta)
        if (respuesta != null) {
            return callback({ state: true })
        } else {
            return callback({ state: false })
        }
    }).catch((error) => {
        return callback({ state: false })
    })
}

usuariosModel.CargarId = function (post, callback) {
    Mymodel.find({ _id: post.usu_id }, { __v: 0, usu_password: 0 }).then((respuesta) => {
        return callback({ datos: respuesta })
    })
}

usuariosModel.ExisteEmail = function (post, callback) {
    console.log("Email")
    Mymodel.find({ usu_email: post.usu_email }, {}).then((respuesta) => {

        return callback(respuesta)
    })
}

usuariosModel.ExisteId = function (post, callback) {
    console.log("Id")
    Mymodel.find({ _id: post.usu_id }, {}).then((respuesta) => {

        return callback(respuesta)
    })
}

usuariosModel.Registrar = function (post, callback) {
    const instancia = new Mymodel
    instancia.usu_nombre = post.usu_nombre
    instancia.usu_email = post.usu_email
    instancia.usu_password = post.usu_password
    instancia.usu_estado = "Inactivo"
    instancia.usu_rol = "Cliente"
    instancia.usu_codigoact = post.usu_codigo
    instancia.save().then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })

}

usuariosModel.Login = function (post, callback) {
    console.log(post.usu_email)
    console.log(post.usu_password)
    Mymodel.find({ usu_email: post.usu_email, usu_password: post.usu_password }).then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true, datos: respuesta })
    })
}

usuariosModel.Activar = function (post, callback) {

    console.log(post.usu_email)
    console.log(post.usu_codigoact)

    Mymodel.findOneAndUpdate({ usu_email: post.usu_email, usu_codigoact: post.usu_codigoact }, {
        usu_estado: 'Activo'
    }).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.SolicitudRecuperarPassword = function (post, callback) {
    Mymodel.findOneAndUpdate({ usu_email: post.usu_email }, { usu_codigorec: post.usu_codigorec }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })
}

usuariosModel.RecuperarPassword = function (post, callback) {
    console.log(post.usu_email)
    console.log(post.usu_codigorec)
    Mymodel.findOneAndUpdate({ usu_email: post.usu_email, usu_codigorec: post.usu_codigorec },
        { usu_password: post.usu_password, usu_codigorec: "" }
    ).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        return callback({ state: false })
    })

}

usuariosModel.ActualizarPass = function (post, callback) {
    Mymodel.findByIdAndUpdate({ _id: post.usu_id }, {
        usu_password: post.usu_password
    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })

}

usuariosModel.ActualizarMisDatos = function (post, callback) {
    Mymodel.findByIdAndUpdate({ _id: post.usu_id }, {
        usu_nombre: post.usu_nombre,
        usu_ciudad: post.usu_ciudad,
        usu_barrio: post.usu_barrio,
        usu_calle: post.usu_calle,
        usu_carrera: post.usu_carrera,
        usu_num: post.usu_num,
        usu_complemento: post.usu_complemento
    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        return callback({ state: false })
    })
}

usuariosModel.ConsultaActivos = function(post,callback) {
   Mymodel.countDocuments({ usu_estado: "Activo"  }, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.ConsultaInactivos = function(post,callback) {
   Mymodel.countDocuments({ usu_estado: "Inactivo"  }, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.ConsultaBaneados = function(post,callback) {
   Mymodel.countDocuments({ usu_estado: "Baneado"  }, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

usuariosModel.ConsultaUsuarios = function(post,callback) {
   Mymodel.countDocuments({}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

//Ruta de Exportacion
module.exports.usuariosModel = usuariosModel