var config = require('./config.js').config
var express = require('express')
global.app = express()
global.sha256 = require('sha256')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
const cors = require('cors')
global.nodemailer = require('nodemailer')
const session = require("express-session")
const MongoStore = require("connect-mongo")
global.path = require('path')
global.appRoot = path.resolve(__dirname)



app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (config.listaBlanca.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Responder correctamente las preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});


//primero base de datos
mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
    console.log("Conexion correcta a la mongo")
}).catch((error) => {
    console.log(error)
})


// despues sesiones
app.use(session({
    secret:config.clavesecreta,
    resave:true,
    saveUninitialized:true,
    store:MongoStore.create({
        client:mongoose.connection.getClient(),
        dbName:config.bd+"Sesiones",
        collectionName:"sessiones",
        ttl:config.expiracion
    }),
    cookie:{
        maxAge:config.expiracion,httpOnly:true
    },
    name:"Cookieapp",
    rolling:true
}))


// exponer carpeta
app.use('/imagenes', express.static(__dirname+'/imagenes'))


require('./rutas.js')
app.listen(config.puerto, function () {
    console.log("Servidor por el puerto 3000")
})

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true)
        if (config.listaBlanca.indexOf(origin) == -1) {
            return callback("Error de cors, no hay permisos", true)
        } else {
            return callback(null, true)
        }
    }
}))



// exportacion 
module.exports.app = app 