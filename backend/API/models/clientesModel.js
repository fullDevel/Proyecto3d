const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var clientesSchema = new Schema({
    cli_codigo: String,
    cli_nombre: String
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("clientes", clientesSchema)

var clientesModel = {}

clientesModel.ExisteCodigo = function(post,callback){
    Mymodel.find({cli_codigo:post.cli_codigo},{}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error)=>{
        console.log(error)
    });
    
}

clientesModel.ExisteId = function(post,callback){
    Mymodel.find({_id:post.cli_id},{}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error)=>{
        console.log(error)
    });
    
}

clientesModel.Guardar = function(post,callback){
    const instancia = new Mymodel
    instancia.cli_codigo = post.cli_codigo
    instancia.cli_nombre = post.cli_nombre

    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    }) 
}

clientesModel.CargarTodos = function(post,callback){
    Mymodel.find({},{}).then((respuesta)=>{
        return callback(respuesta)
    })
}

clientesModel.CargarId = function(post,callback){
        Mymodel.find({_id:post.cli_id},{}).then((respuesta)=>{
        return callback(respuesta)
    })



}

clientesModel.Actualizar = function(post,callback){
    Mymodel.findOneAndUpdate({_id:post.cli_id},{cli_nombre:post.cli_nombre}).then((respuesta)=>{
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    })
}

clientesModel.Eliminar  = function(post,callback){
        Mymodel.findOneAndDelete({_id:post.cli_id},{}).then((respuesta)=>{
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    })
}

module.exports.clientesModel = clientesModel