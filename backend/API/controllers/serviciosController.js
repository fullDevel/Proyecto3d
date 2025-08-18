//Rutas de importacion
const serviciosModel = require('../models/serviciosModel.js').serviciosModel
const config = require('../../config.js').config
var serviciosController = {}

serviciosController.Guardar = function (request, response) {
    var post = {
        prd_codigo: request.body.prd_codigo,
        prd_nombre: request.body.prd_nombre
    }

    if (post.prd_codigo == undefined || post.prd_codigo == null || post.prd_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.prd_nombre == undefined || post.prd_nombre == null || post.prd_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    serviciosModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            serviciosModel.Guardar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: 'El elemento fue almacenado correctamente' })
                }
                else {
                    response.json({ state: false, mensaje: 'Se presentó un error al almacenar' })
                }
            })
        }
        else {
            response.json({ state: false, mensaje: 'El codigo del elemento ya existe intento con otro' })
        }
    })

}

serviciosController.CargarTodos = function (request, response) {
    serviciosModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

serviciosController.CargarId = function (request, response) {

    var post = {
        prd_id: request.body.prd_id
    }

    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    serviciosModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

serviciosController.Actualizar = function (request, response) {
    var post = {
        prd_id: request.body.prd_id,
        prd_nombre: request.body.prd_nombre
    }

    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.prd_nombre == undefined || post.prd_nombre == null || post.prd_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }
    serviciosModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            serviciosModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

serviciosController.Eliminar = function (request, response) {
    var post = {
        prd_id: request.body.prd_id
    }

    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    serviciosModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            serviciosModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}

module.exports.serviciosController = serviciosController