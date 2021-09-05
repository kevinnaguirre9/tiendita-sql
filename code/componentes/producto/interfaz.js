const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {authJwt} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', function(req, res) {
    const filtroProducto = req.query.producto || null
    controlador.obtenerProductos( filtroProducto )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.post('/', authJwt.verificarToken, function(req, res) {
    controlador.agregarProducto( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.patch('/', authJwt.verificarToken, function(req, res) {
    controlador.actualizarProducto(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.delete('/', authJwt.verificarToken, function(req, res) {
    controlador.eliminarProducto(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta