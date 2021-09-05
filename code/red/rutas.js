const ciudad = require('../componentes/ciudad/interfaz')
const pais = require('../componentes/pais/interfaz')
const empleado = require('../componentes/empleado/interfaz')
const cliente = require('../componentes/cliente/interfaz')
const proveedor = require('../componentes/proveedor/interfaz')
const producto = require('../componentes/producto/interfaz')
const factura = require('../componentes/factura/interfaz')
const autenticacion = require('../componentes/autenticacion/interfaz')

const rutas = function(servidor) {
    servidor.use('/ciudad', ciudad)
    servidor.use('/pais', pais)
    servidor.use('/empleado', empleado)
    servidor.use('/cliente', cliente)
    servidor.use('/proveedor', proveedor)
    servidor.use('/producto', producto)
    servidor.use('/factura', factura)
    servidor.use('/autenticacion', autenticacion)
}

module.exports = rutas