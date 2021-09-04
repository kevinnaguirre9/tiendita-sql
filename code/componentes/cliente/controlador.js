const datos = require('./almacenamiento')

function obtenerClientes( filtroCiudad ) {
    return new Promise((resolve, reject) => {
        resolve( datos.obtener( filtroCiudad ) )
    })
}

function agregarCliente( empleado ) {
    return new Promise((resolve, reject) => {
        datos.agregar( empleado )
        resolve( empleado )
    })
}

function actualizarCliente( empleado ) {
    return new Promise((resolve, reject) => {
        datos.actualizar( empleado )
        resolve( empleado )
    })
}

function eliminarCliente( empleado ) {
    return new Promise((resolve, reject) => {
        datos.eliminar( empleado )
        resolve( empleado )
    })
}

module.exports = {
    obtenerClientes,
    agregarCliente,
    actualizarEmpleado,
    eliminarCliente,
}