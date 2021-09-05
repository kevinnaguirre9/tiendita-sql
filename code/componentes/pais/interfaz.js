const express = require('express')
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')
const {authJwt} = require('../../middlewares/index')

const ruta = express.Router()

ruta.get('/', authJwt.verificarToken, function(req, res) {
    const filtroPais = req.query.pais || null
    controlador.obtenerPaises( filtroPais )
        .then((data) => {
            respuesta.exito(req, res, data, 200)
        })
        .catch((error) => {
            respuesta.error(req, res, error, 500)
        })
})

module.exports = ruta