const ciudad = require('../componentes/ciudad/interfaz')
const pais = require('../componentes/pais/interfaz')
const empleado = require('../componentes/empleado/interfaz')
const cliente = require('../componentes/cliente/interfaz')

const rutas = function(servidor) {
    servidor.use('/ciudad', ciudad)
    servidor.use('/pais', pais)
    servidor.use('/empleado', empleado)
    servidor.use('/cliente', cliente)
}

module.exports = rutas