//Rutas de importacion
const slideModel = require('../models/slideModel.js').slideModel
const config = require('../../config.js').config

var slideController = {}

slideController.Guardar = function (request, response) {
    console.log("Guardar")
    var post = {
        sld_codigo: request.body.sld_codigo,
        sld_nombre: request.body.sld_nombre,
        sld_imagen: request.body.sld_imagen,
        sld_estado: request.body.sld_estado,
        sld_descripcion: request.body.sld_descripcion

    }
    console.log(post)
    if (post.sld_codigo == undefined || post.sld_codigo == null || post.sld_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.sld_nombre == undefined || post.sld_nombre == null || post.sld_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

     console.log(post.sld_imagen)
    if (post.sld_imagen == undefined || post.sld_imagen == null || post.sld_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.sld_descripcion == undefined || post.sld_descripcion == null || post.sld_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

     if (post.sld_estado == undefined || post.sld_estado == null || post.sld_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }
console.log("antes Existe Codigo")
    slideModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            console.log("Existe Codgio")
            slideModel.Guardar(post, function (respuesta) {
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

slideController.CargarTodos = function (request, response) {
    slideModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

slideController.CargarId = function (request, response) {

    var post = {
        sld_id: request.body.sld_id
    }

    if (post.sld_id == undefined || post.sld_id == null || post.sld_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    slideModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

slideController.Actualizar = function (request, response) {
    console.log("Actualizar Producto back")
    var post = {
        sld_id: request.body.sld_id,
        sld_nombre: request.body.sld_nombre,
        sld_imagen: request.body.sld_imagen,
        sld_descripcion: request.body.sld_descripcion,
        sld_estado: request.body.sld_estado
    }
    console.log(post)
    if (post.sld_id == undefined || post.sld_id == null || post.sld_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.sld_nombre == undefined || post.sld_nombre == null || post.sld_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }


    if (post.sld_imagen == undefined || post.sld_imagen == null || post.sld_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.sld_descripcion == undefined || post.sld_descripcion == null || post.sld_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.sld_estado == undefined || post.sld_estado == null || post.sld_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }
    console.log("antes existe")
    slideModel.ExisteId(post, function (existe) {
        console.log(existe)
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            slideModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

slideController.Eliminar = function (request, response) {
    var post = {
        sld_id: request.body.sld_id
    }

    if (post.sld_id == undefined || post.sld_id == null || post.sld_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    slideModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            slideModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}
module.exports.slideController = slideController