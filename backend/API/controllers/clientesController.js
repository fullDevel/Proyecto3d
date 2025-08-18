//Rutas de importacion
const clientesModel = require('../models/clientesModel.js').clientesModel
const config = require('../../config.js').config
var clientesController = {}

clientesController.Guardar = function (request, response) {
    var post = {
        cli_codigo: request.body.cli_codigo,
        cli_nombre: request.body.cli_nombre
    }

    if (post.cli_codigo == undefined || post.cli_codigo == null || post.cli_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.cli_nombre == undefined || post.cli_nombre == null || post.cli_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    clientesModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            clientesModel.Guardar(post, function (respuesta) {
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

clientesController.CargarTodos = function (request, response) {
    clientesModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

clientesController.CargarId = function (request, response) {

    var post = {
        cli_id: request.body.cli_id
    }

    if (post.cli_id == undefined || post.cli_id == null || post.cli_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    clientesModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

clientesController.Actualizar = function (request, response) {
    var post = {
        cli_id: request.body.cli_id,
        cli_nombre: request.body.cli_nombre
    }

    if (post.cli_id == undefined || post.cli_id == null || post.cli_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.cli_nombre == undefined || post.cli_nombre == null || post.cli_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }
    clientesModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            clientesModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

clientesController.Eliminar = function (request, response) {
    var post = {
        cli_id: request.body.cli_id
    }

    if (post.cli_id == undefined || post.cli_id == null || post.cli_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    clientesModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            clientesModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}

module.exports.clientesController = clientesController