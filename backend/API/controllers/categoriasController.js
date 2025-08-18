//Rutas de importacion
const categoriasModel = require('../models/categoriasModel.js').categoriasModel
const config = require('../../config.js').config
var categoriasController = {}


categoriasController.Guardar = function (request, response) {
    console.log("Guardar")
    var post = {
        ctg_codigo: request.body.ctg_codigo,
        ctg_nombre: request.body.ctg_nombre,
        ctg_imagen: request.body.ctg_imagen,
        ctg_descripcion: request.body.ctg_descripcion,
        ctg_estado: request.body.ctg_estado
    }
    console.log(post)
    if (post.ctg_codigo == undefined || post.ctg_codigo == null || post.ctg_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.ctg_nombre == undefined || post.ctg_nombre == null || post.ctg_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }


    console.log(post.ctg_imagen)
    if (post.ctg_imagen == undefined || post.ctg_imagen == null || post.ctg_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.ctg_descripcion == undefined || post.ctg_descripcion == null || post.ctg_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.ctg_estado == undefined || post.ctg_estado == null || post.ctg_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    categoriasModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            categoriasModel.Guardar(post, function (respuesta) {
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

categoriasController.CargarTodos = function (request, response) {
    categoriasModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

categoriasController.CargarId = function (request, response) {

    var post = {
        ctg_id: request.body.ctg_id
    }

    if (post.ctg_id == undefined || post.ctg_id == null || post.ctg_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    categoriasModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

categoriasController.Actualizar = function (request, response) {
    console.log("Actualizar Producto back")
    var post = {
        ctg_id: request.body.ctg_id,
        ctg_nombre: request.body.ctg_nombre,
        ctg_imagen: request.body.ctg_imagen,
        ctg_descripcion: request.body.ctg_descripcion,
        ctg_estado: request.body.ctg_estado
    }
    console.log(post)
    if (post.ctg_id == undefined || post.ctg_id == null || post.ctg_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.ctg_nombre == undefined || post.ctg_nombre == null || post.ctg_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }


    if (post.ctg_imagen == undefined || post.ctg_imagen == null || post.ctg_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.ctg_descripcion == undefined || post.ctg_descripcion == null || post.ctg_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.ctg_estado == undefined || post.ctg_estado == null || post.ctg_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }
    console.log("antes existe")
    categoriasModel.ExisteId(post, function (existe) {
        console.log(existe)
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            categoriasModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

categoriasController.Eliminar = function (request, response) {
    var post = {
        ctg_id: request.body.ctg_id
    }

    if (post.ctg_id == undefined || post.ctg_id == null || post.ctg_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    categoriasModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            categoriasModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}

categoriasController.CargarTodasCategorias = function (request, response) {
    categoriasModel.CargarTodasCategorias(null, function (respuesta) {
        response.json(respuesta)
    })
}


module.exports.categoriasController = categoriasController