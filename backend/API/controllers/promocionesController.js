//Rutas de importacion
const promocionesModel = require('../models/promocionesModel.js').promocionesModel
const config = require('../../config.js').config
var promocionesController = {}

promocionesController.Guardar = function (request, response) {
    console.log("Guardar")
    var post = {
        prom_codigo: request.body.prom_codigo,
        prom_nombre: request.body.prom_nombre,
        prom_imagen: request.body.prom_imagen,
        prom_cantidad: request.body.prom_cantidad,
        prom_precio: request.body.prom_precio,
        prom_descripcion: request.body.prom_descripcion,
        prom_estado: request.body.prom_estado
    }
    console.log(post)
    if (post.prom_codigo == undefined || post.prom_codigo == null || post.prom_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.prom_nombre == undefined || post.prom_nombre == null || post.prom_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.prom_cantidad == undefined || post.prom_cantidad == null || post.prom_cantidad == '') {
        response.json({ state: false, mensaje: "La cantidad es obligatoria" })
        return false
    }

    if (post.prom_precio == undefined || post.prom_precio == null || post.prom_precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }
     console.log(post.prom_imagen)
    if (post.prom_imagen == undefined || post.prom_imagen == null || post.prom_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.prom_descripcion == undefined || post.prom_descripcion == null || post.prom_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.prom_estado == undefined || post.prom_estado == null || post.prom_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    promocionesModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            promocionesModel.Guardar(post, function (respuesta) {
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

promocionesController.CargarTodos = function (request, response) {
    promocionesModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

promocionesController.CargarId = function (request, response) {

    var post = {
        prom_id: request.body.prom_id
    }

    if (post.prom_id == undefined || post.prom_id == null || post.prom_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    promocionesModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

promocionesController.Actualizar = function (request, response) {
    console.log("Actualizar Producto back")
    var post = {
        prom_id: request.body.prom_id,
        prom_nombre: request.body.prom_nombre,
        prom_imagen: request.body.prom_imagen,
        prom_cantidad: request.body.prom_cantidad,
        prom_precio: request.body.prom_precio,
        prom_descripcion: request.body.prom_descripcion,
        prom_estado: request.body.prom_estado
    }
    console.log(post)
    if (post.prom_id == undefined || post.prom_id == null || post.prom_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.prom_nombre == undefined || post.prom_nombre == null || post.prom_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.prom_cantidad == undefined || post.prom_cantidad == null || post.prom_cantidad == '') {
        response.json({ state: false, mensaje: "La cantidad es obligatoria" })
        return false
    }

    if (post.prom_precio == undefined || post.prom_precio == null || post.prom_precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (post.prom_imagen == undefined || post.prom_imagen == null || post.prom_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.prom_descripcion == undefined || post.prom_descripcion == null || post.prom_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.prom_estado == undefined || post.prom_estado == null || post.prom_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }
    console.log("antes existe")
    promocionesModel.ExisteId(post, function (existe) {
        console.log(existe)
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            promocionesModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

promocionesController.Eliminar = function (request, response) {
    var post = {
        prom_id: request.body.prom_id
    }

    if (post.prom_id == undefined || post.prom_id == null || post.prom_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    promocionesModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            promocionesModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}

promocionesController.CargarTodosCliente = function (request, response) {
    promocionesModel.CargarTodosCliente(null, function (respuesta) {
        response.json(respuesta)
    })
}


module.exports.promocionesController = promocionesController