const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var productosSchema = new Schema({
    prd_codigo: String,
    prd_nombre: String,
    prd_imagen: String,
    prd_precio: Number,
    prd_cantidad: Number,
    prd_descripcion: String,
    prd_estado: String
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("productos", productosSchema)

var productosModel = {}

productosModel.ExisteCodigo = function (post, callback) {
    Mymodel.find({ prd_codigo: post.prd_codigo }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

productosModel.ExisteId = function (post, callback) {
    Mymodel.find({ _id: post.prd_id }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

productosModel.Guardar = function (post, callback) {
    const instancia = new Mymodel
    instancia.prd_codigo = post.prd_codigo
    instancia.prd_nombre = post.prd_nombre
    instancia.prd_imagen = post.prd_imagen
    instancia.prd_cantidad = parseInt(post.prd_cantidad)
    instancia.prd_precio = parseInt(post.prd_precio)
    instancia.prd_descripcion = post.prd_descripcion
    instancia.prd_estado = post.prd_estado

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

productosModel.CargarTodos = function (post, callback) {
    Mymodel.find({}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

productosModel.CargarId = function (post, callback) {
    Mymodel.find({ _id: post.prd_id }, {}).then((respuesta) => {
        return callback(respuesta)
    })



}

productosModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate({ _id: post.prd_id }, { 
        prd_nombre: post.prd_nombre,
        prd_imagen: post.prd_imagen,
        prd_cantidad: parseInt(post.prd_cantidad),
        prd_precio: parseInt(post.prd_precio),
        prd_descripcion:post.prd_descripcion,
        prd_estado:post.prd_estado

    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

productosModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete({ _id: post.prd_id }, {}).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

productosModel.CargarTodosCliente = function (post, callback) {
    Mymodel.find({prd_estado:'Activo'}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

module.exports.productosModel = productosModel