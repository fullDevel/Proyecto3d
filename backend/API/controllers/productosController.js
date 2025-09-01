//Rutas de importacion
const productosModel = require('../models/productosModel.js').productosModel
const config = require('../../config.js').config
var productosController = {}

productosController.Guardar = function (request, response) {
    console.log("Guardar")
    var post = {
        prd_codigo: request.body.prd_codigo,
        prd_nombre: request.body.prd_nombre,
        prd_imagen: request.body.prd_imagen,
        prd_cantidad: request.body.prd_cantidad,
        prd_precio: request.body.prd_precio,
        prd_descripcion: request.body.prd_descripcion,
        prd_estado: request.body.prd_estado,
        prd_alto: request.body.prd_alto,
        prd_ancho: request.body.prd_ancho,
        prd_profundidad: request.body.prd_profundidad,
        prd_categoria: request.body.prd_categoria
    }
    console.log(post)
    if (post.prd_codigo == undefined || post.prd_codigo == null || post.prd_codigo.trim() == '') {
        response.json({ state: false, mensaje: "El campo codigo es obligatorio" })
        return false
    }

    if (post.prd_nombre == undefined || post.prd_nombre == null || post.prd_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.prd_cantidad == undefined || post.prd_cantidad == null || post.prd_cantidad == '') {
        response.json({ state: false, mensaje: "La cantidad es obligatoria" })
        return false
    }

    if (post.prd_precio == undefined || post.prd_precio == null || post.prd_precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }
    console.log(post.prd_imagen)
    if (post.prd_imagen == undefined || post.prd_imagen == null || post.prd_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.prd_descripcion == undefined || post.prd_descripcion == null || post.prd_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.prd_estado == undefined || post.prd_estado == null || post.prd_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }

    if (post.prd_categoria == undefined || post.prd_categoria == null || post.prd_categoria.trim() == '') {
        response.json({ state: false, mensaje: "El campo categoria es obligatorio" })
        return false
    }

    productosModel.ExisteCodigo(post, function (existe) {
        if (existe.length == 0) {
            productosModel.Guardar(post, function (respuesta) {
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

productosController.CargarTodos = function (request, response) {
    productosModel.CargarTodos(null, function (respuesta) {
        response.json(respuesta)
    })
}

productosController.CargarId = function (request, response) {

    var post = {
        prd_id: request.body.prd_id
    }

    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    productosModel.CargarId(post, function (respuesta) {
        response.json(respuesta)
    })
}

productosController.Actualizar = function (request, response) {
    console.log("Actualizar Producto back")
    var post = {
        prd_id: request.body.prd_id,
        prd_nombre: request.body.prd_nombre,
        prd_imagen: request.body.prd_imagen,
        prd_cantidad: request.body.prd_cantidad,
        prd_precio: request.body.prd_precio,
        prd_descripcion: request.body.prd_descripcion,
        prd_estado: request.body.prd_estado,
        prd_alto: request.body.prd_alto,
        prd_ancho: request.body.prd_ancho,
        prd_profundidad: request.body.prd_profundidad,
        prd_categoria: request.body.prd_categoria

    }
    console.log(post)
    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    if (post.prd_nombre == undefined || post.prd_nombre == null || post.prd_nombre.trim() == '') {
        response.json({ state: false, mensaje: "El campo nombre es obligatorio" })
        return false
    }

    if (post.prd_cantidad == undefined || post.prd_cantidad == null || post.prd_cantidad == '') {
        response.json({ state: false, mensaje: "La cantidad es obligatoria" })
        return false
    }

    if (post.prd_precio == undefined || post.prd_precio == null || post.prd_precio == '') {
        response.json({ state: false, mensaje: "El campo precio es obligatorio" })
        return false
    }

    if (post.prd_imagen == undefined || post.prd_imagen == null || post.prd_imagen.trim() == '') {
        response.json({ state: false, mensaje: "Imagen obligatoria" })
        return false
    }

    if (post.prd_descripcion == undefined || post.prd_descripcion == null || post.prd_descripcion.trim() == '') {
        response.json({ state: false, mensaje: "El campo descripcion es obligatorio" })
        return false
    }

    if (post.prd_estado == undefined || post.prd_estado == null || post.prd_estado.trim() == '') {
        response.json({ state: false, mensaje: "El campo estado es obligatorio" })
        return false
    }
    console.log("antes existe")
    productosModel.ExisteId(post, function (existe) {
        console.log(existe)
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea actualizar no existe" })
        } else {
            productosModel.Actualizar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha actualizado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al actualizar el elemento" })
                }
            })
        }

    })

}

productosController.Eliminar = function (request, response) {
    var post = {
        prd_id: request.body.prd_id
    }

    if (post.prd_id == undefined || post.prd_id == null || post.prd_id.trim() == '') {
        response.json({ state: false, mensaje: "El campo id es obligatorio" })
        return false
    }

    productosModel.ExisteId(post, function (existe) {
        if (existe.length == 0) {
            response.json({ state: false, mensaje: "El Id que desea eliminar no existe" })
        } else {
            productosModel.Eliminar(post, function (respuesta) {
                if (respuesta.state == true) {
                    response.json({ state: true, mensaje: "Se ha eliminado el elemento" })
                } else {
                    response.json({ state: false, mensaje: "Se presento un error al eliminar el elemento" })
                }
            })
        }

    })

}

productosController.CargarTodosCliente = function (request, response) {
    productosModel.CargarTodosCliente(null, function (respuesta) {
        response.json(respuesta)
    })
}


module.exports.productosController = productosController