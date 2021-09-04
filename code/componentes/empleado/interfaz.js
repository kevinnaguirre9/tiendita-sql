const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {verificarUsuario} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', function(req, res) {
    const filtroEmpleado = req.query.empleado || null
    controlador.obtenerEmpleados( filtroEmpleado )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.post('/', verificarUsuario.verificarUsuarioDuplicado,  function(req, res) {
    controlador.agregarEmpleado( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.patch('/', function(req, res) {
    controlador.actualizarEmpleado(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

ruta.delete('/', function(req, res) {
    controlador.eliminarEmpleado(req.body)
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta