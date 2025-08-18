//rutas de importacion
const usuariosController = require('./API/controllers/usuariosController').usuariosController
const security = require("./midleware/security.js").security

app.post('/Usuarios/Guardar', security.Soloadmin, function (request, response) {
    usuariosController.Guardar(request, response)
})

app.post('/Usuarios/CargarTodos', security.Soloadmin, function (request, response) {
    usuariosController.CargarTodos(request, response)
})

app.put('/Usuarios/Actualizar', security.Soloadmin, function (request, response) {
    usuariosController.Actualizar(request, response)
})

app.delete('/Usuarios/Eliminar', security.Soloadmin, function (request, response) {
    usuariosController.Eliminar(request, response)
})

app.post('/Usuarios/CargarId/', security.Soloadmin, function (request, response) {
    usuariosController.CargarId(request, response)
})


app.post('/Usuarios/Registrar/', function (request, response) {
    usuariosController.Registrar(request, response)
})

app.post('/Usuarios/Login/', function (request, response) {
    usuariosController.Login(request, response)
})

app.post('/Usuarios/Activar/', function (request, response) {
    usuariosController.Activar(request, response)
})

app.post("/Usuarios/Estado", function (request, response) {
    response.json(request.session)
})

app.post('/Usuarios/Logout', function (request, response) {
    request.session.destroy()
    response.json({ state: true, mensaje: "Sesión finalizada" })
})

app.get('/Usuarios/Activar/:usu_email/:usu_codigoact', function (request, response) {
    usuariosController.Activar(request, response)
})

app.post('/Usuarios/SolicitudRecuperarPassword/', function (request, response) {
    usuariosController.SolicitudRecuperarPassword(request, response)
})

app.post('/Usuarios/RecuperarPassword/', function (request, response) {
    usuariosController.RecuperarPassword(request, response)
})

app.post('/Usuarios/ActualizarPass', function (request, response) {
    usuariosController.ActualizarPass(request, response)
})

app.post('/Usuarios/CargarMisDatos/', function (request, response) {
    usuariosController.CargarMisDatos(request, response)
})

app.post('/Usuarios/ActualizarMisDatos/', function (request, response) {
    usuariosController.ActualizarMisDatos(request, response)
})


const categoriasController = require('./API/controllers/categoriasController').categoriasController

app.post('/categorias/Guardar', function (request, response) {
    categoriasController.Guardar(request, response)
})
app.post('/categorias/CargarTodasCategorias', function (request, response) {
    
    categoriasController.CargarTodasCategorias(request, response)
})
app.put('/categorias/Actualizar', function (request, response) {
    categoriasController.Actualizar(request, response)
})
app.delete('/categorias/Eliminar', function (request, response) {
    categoriasController.Eliminar(request, response)
})
app.post('/categorias/CargarId', function (request, response) {
    categoriasController.CargarId(request, response)
})


const productosController = require('./API/controllers/productosController').productosController

app.post('/productos/Guardar',  function (request, response) {
    productosController.Guardar(request, response)
})

app.post('/productos/CargarTodos',  function (request, response) {
    productosController.CargarTodos(request, response)
})

app.put('/productos/Actualizar',  function (request, response) {
    productosController.Actualizar(request, response)
})

app.delete('/productos/Eliminar', function (request, response) {
    productosController.Eliminar(request, response)
})

app.post('/productos/CargarId', function (request, response) {
    productosController.CargarId(request, response)
})

app.post('/productos/CargarTodosCliente',  function (request, response) {
    productosController.CargarTodosCliente(request, response)
})



const serviciosController = require('./API/controllers/serviciosController').serviciosController

app.post('/servicios/Guardar',  function (request, response) {
    serviciosController.Guardar(request, response)
})

app.post('/servicios/CargarTodos',  function (request, response) {
    serviciosController.CargarTodos(request, response)
})

app.put('/servicios/Actualizar',  function (request, response) {
    serviciosController.Actualizar(request, response)
})

app.delete('/servicios/Eliminar', function (request, response) {
    serviciosController.Eliminar(request, response)
})

app.post('/servicios/CargarId', function (request, response) {
    serviciosController.CargarId(request, response)
})


const clientesController = require('./API/controllers/clientesController').clientesController

app.post('/clientes/Guardar',  function (request, response) {
    clientesController.Guardar(request, response)
})

app.post('/clientes/CargarTodos',  function (request, response) {
    clientesController.CargarTodos(request, response)
})

app.put('/clientes/Actualizar',  function (request, response) {
    clientesController.Actualizar(request, response)
})

app.delete('/clientes/Eliminar', function (request, response) {
    clientesController.Eliminar(request, response)
})

app.post('/clientes/CargarId', function (request, response) {
    clientesController.CargarId(request, response)
})

const anexosController = require('./API/controllers/anexosController').anexosController
app.post('/anexos/AnexosProductos/:nombre',  function (request, response) {

    anexosController.AnexosProductos(request, response)
})


const slideController = require('./API/controllers/slideController.js').slideController

app.post('/slide/Guardar',  function (request, response) {
    slideController.Guardar(request, response)
})

app.post('/slide/CargarTodos',  function (request, response) {
    slideController.CargarTodos(request, response)
})

app.post('/slide/CargarId', function (request, response) {
    slideController.CargarId(request, response)
})

app.put('/slide/Actualizar', function (request, response) {
    slideController.Actualizar(request, response)
})