const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var categoriasSchema = new Schema({
    ctg_codigo: String,
    ctg_nombre: String,
    ctg_imagen: String,
    ctg_descripcion: String,
    ctg_estado: String
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("categorias", categoriasSchema)

var categoriasModel = {}

categoriasModel.ExisteCodigo = function (post, callback) {
    Mymodel.find({ ctg_codigo: post.ctg_codigo }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

categoriasModel.ExisteId = function (post, callback) {
    Mymodel.find({ _id: post.ctg_id }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

categoriasModel.Guardar = function (post, callback) {
    const instancia = new Mymodel
    instancia.ctg_codigo = post.ctg_codigo
    instancia.ctg_nombre = post.ctg_nombre
    instancia.ctg_imagen = post.ctg_imagen
    instancia.ctg_descripcion = post.ctg_descripcion
    instancia.ctg_estado = post.ctg_estado

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

categoriasModel.CargarTodos = function (post, callback) {
    Mymodel.find({}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

categoriasModel.CargarId = function (post, callback) {
    Mymodel.find({ _id: post.ctg_id }, {}).then((respuesta) => {
        return callback(respuesta)
    })



}

categoriasModel.ConsultaCod = function (post, callback) {
    Mymodel.find({ ctg_codigo: post.ctg_codigo }, {}).then((respuesta) => {
        return callback(respuesta)
    })



}


categoriasModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate({ _id: post.ctg_id }, { 
        ctg_nombre: post.ctg_nombre,
        ctg_imagen: post.ctg_imagen,
        ctg_descripcion:post.ctg_descripcion,
        ctg_estado:post.ctg_estado

    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

categoriasModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete({ _id: post.ctg_id }, {}).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

categoriasModel.CargarTodasCategorias = function (post, callback) {
    Mymodel.find({ctg_estado:'Activo'}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

module.exports.categoriasModel = categoriasModel