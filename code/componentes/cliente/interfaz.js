const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {authJwt} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', authJwt.verificarToken, function(req, res) {
    const filtroCliente = req.query.cliente || null
    controlador.obtenerClientes( filtroCliente )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.post('/', authJwt.verificarToken, function(req, res) {
    controlador.agregarCliente( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.patch('/', authJwt.verificarToken, function(req, res) {
    controlador.actualizarCliente(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.delete('/', authJwt.verificarToken, function(req, res) {
    controlador.eliminarCliente(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta