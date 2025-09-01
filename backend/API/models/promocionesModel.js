const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var promocionesSchema = new Schema({
    prom_codigo: String,
    prom_nombre: String,
    prom_imagen: String,
    prom_precio: Number,
    prom_cantidad: Number,
    prom_descripcion: String,
    prom_estado: String
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("promociones", promocionesSchema)

var promocionesModel = {}

promocionesModel.ExisteCodigo = function (post, callback) {
    Mymodel.find({ prom_codigo: post.prom_codigo }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

promocionesModel.ExisteId = function (post, callback) {
    Mymodel.find({ _id: post.prom_id }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

promocionesModel.Guardar = function (post, callback) {
    const instancia = new Mymodel
    instancia.prom_codigo = post.prom_codigo
    instancia.prom_nombre = post.prom_nombre
    instancia.prom_imagen = post.prom_imagen
    instancia.prom_cantidad = parseInt(post.prom_cantidad)
    instancia.prom_precio = parseInt(post.prom_precio)
    instancia.prom_descripcion = post.prom_descripcion
    instancia.prom_estado = post.prom_estado

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

promocionesModel.CargarTodos = function (post, callback) {
    Mymodel.find({}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

promocionesModel.CargarId = function (post, callback) {
    Mymodel.find({ _id: post.prom_id }, {}).then((respuesta) => {
        return callback(respuesta)
    })



}

promocionesModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate({ _id: post.prom_id }, { 
        prom_nombre: post.prom_nombre,
        prom_imagen: post.prom_imagen,
        prom_cantidad: parseInt(post.prom_cantidad),
        prom_precio: parseInt(post.prom_precio),
        prom_descripcion:post.prom_descripcion,
        prom_estado:post.prom_estado

    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

promocionesModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete({ _id: post.prom_id }, {}).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

promocionesModel.CargarTodosCliente = function (post, callback) {
    Mymodel.find({prom_estado:'Activo'}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

module.exports.promocionesModel = promocionesModel