const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {authJwt} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', authJwt.verificarToken,function(req, res) {
    const filtroProveedor = req.query.proveedor || null
    controlador.obtenerProveedor( filtroProveedor )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.post('/', authJwt.verificarToken, function(req, res) {
    controlador.agregarProveedor( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.patch('/', authJwt.verificarToken, function(req, res) {
    controlador.actualizarProveedor(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.delete('/', authJwt.verificarToken, function(req, res) {
    controlador.eliminarProveedor(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta