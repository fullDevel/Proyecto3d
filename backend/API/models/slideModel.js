const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var slideSchema = new Schema({
    sld_codigo: String,
    sld_nombre: String,
    sld_imagen: String,
    sld_estado: String,
    sld_descripcion: String,
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("slide", slideSchema)

var slideModel = {}

slideModel.Guardar = function (post, callback) {
    const instancia = new Mymodel
    instancia.sld_codigo = post.sld_codigo
    instancia.sld_nombre = post.sld_nombre
    instancia.sld_imagen = post.sld_imagen
    instancia.sld_descripcion = post.sld_descripcion


    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}

slideModel.ExisteCodigo = function (post, callback) {
    Mymodel.find({ sld_codigo: post.sld_codigo }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

slideModel.CargarTodos = function (post, callback) {
    Mymodel.find({}, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

slideModel.CargarId = function (post, callback) {
    Mymodel.find({ _id: post.sld_id }, {}).then((respuesta) => {
        return callback(respuesta)
    })
}

slideModel.ExisteId = function (post, callback) {
    Mymodel.find({ _id: post.sld_id }, {}).then((respuesta) => {
        return callback(respuesta)
    }).catch((error) => {
        console.log(error)
    });

}

slideModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate({ _id: post.sld_id }, { 
        sld_nombre: post.sld_nombre,
        sld_imagen: post.sld_imagen,
        sld_descripcion:post.sld_descripcion,
        sld_estado:post.sld_estado

    }).then((respuesta) => {
        return callback({ state: true })
    }).catch((error) => {
        console.log(error)
        return callback({ state: false })
    })
}


module.exports.slideModel = slideModel