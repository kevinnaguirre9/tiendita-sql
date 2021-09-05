const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {verificarUsuario, authJwt} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', authJwt.verificarToken, function(req, res) {
    const filtroEmpleado = req.query.empleado || null
    controlador.obtenerEmpleados( filtroEmpleado )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.post('/', verificarUsuario.verificarUsuarioDuplicado, authJwt.verificarToken, function(req, res) {
    controlador.agregarEmpleado( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.patch('/', authJwt.verificarToken, function(req, res) {
    controlador.actualizarEmpleado(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.delete('/', authJwt.verificarToken, function(req, res) {
    controlador.eliminarEmpleado(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta