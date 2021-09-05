const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')

const ruta = express.Router()

ruta.post('/', function(req, res) {
    controlador.iniciarSesion( req.body )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})



module.exports = ruta