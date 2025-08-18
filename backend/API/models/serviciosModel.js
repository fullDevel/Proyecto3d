const mongoose = require("mongoose")
//Esquema de datos
var Schema = mongoose.Schema
//intanciamiento  estructura 
var serviciosSchema = new Schema({
    prd_codigo: String,
    prd_nombre: String
})
// modelo = nombre de coleccion + estructura de la coleccion

const Mymodel = mongoose.model("servicios", serviciosSchema)

var serviciosModel = {}

serviciosModel.ExisteCodigo = function(post,callback){
    Mymodel.find({prd_codigo:post.prd_codigo},{}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error)=>{
        console.log(error)
    });
    
}

serviciosModel.ExisteId = function(post,callback){
    Mymodel.find({_id:post.prd_id},{}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error)=>{
        console.log(error)
    });
    
}

serviciosModel.Guardar = function(post,callback){
    const instancia = new Mymodel
    instancia.prd_codigo = post.prd_codigo
    instancia.prd_nombre = post.prd_nombre

    instancia.save().then((respuesta)=>{
        console.log(respuesta)
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    }) 
}

serviciosModel.CargarTodos = function(post,callback){
    Mymodel.find({},{}).then((respuesta)=>{
        return callback(respuesta)
    })
}

serviciosModel.CargarId = function(post,callback){
        Mymodel.find({_id:post.prd_id},{}).then((respuesta)=>{
        return callback(respuesta)
    })



}

serviciosModel.Actualizar = function(post,callback){
    Mymodel.findOneAndUpdate({_id:post.prd_id},{prd_nombre:post.prd_nombre}).then((respuesta)=>{
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    })
}

serviciosModel.Eliminar  = function(post,callback){
        Mymodel.findOneAndDelete({_id:post.prd_id},{}).then((respuesta)=>{
        return callback({state:true})
    }).catch((error)=>{
        console.log(error)
        return callback({state:false})
    })
}

module.exports.serviciosModel = serviciosModel