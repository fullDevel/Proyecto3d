var multer = require("multer")
const path = require("path")

var anexosController = {}



anexosController.AnexosProductos = function (request, response) {

    var nombre = request.params.nombre
    console.log("nombre imagen")
    console.log(nombre)

    var upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, appRoot + '/imagenes/')
            },
            filename: (req, file, cb) => {
                //               cb(null, file.originalname)
                cb(null, nombre + '.png')
            }
        }),
        fileFilter: (req, file, cb) => {
            var ext = path.extname(file.originalname)
            console.log("fileFilter")
            console.log(file.originalname)
            var extensiones = ['.jpg', '.png', '.tif', '.jpeg', '.jfif']
            if (extensiones.indexOf(ext) == -1) {
                cb('Solo aceptamos formatos de imagen [' + extensiones.join('] - [') + ']', null)
            }
            else {
                cb(null, true)
            }

        }
    }).single('file')

    upload(request, response, function (err) {
        if (err) {
            console.log(err)
            response.json({ state: false, mensaje: err })
        } else {
            response.json({ state: true, mensaje: 'Archivo cargado' })
        }
    })
}

module.exports.anexosController = anexosController