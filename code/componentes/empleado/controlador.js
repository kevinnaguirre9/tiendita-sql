const datos = require('./almacenamiento')

function obtenerEmpleados( filtroCiudad ) {
    return new Promise((resolve, reject) => {
        resolve( datos.obtener( filtroCiudad ) )
    })
}

function agregarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        datos.agregar( empleado )
        resolve( empleado )
    })
}

function actualizarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        datos.actualizar( empleado )
        resolve( empleado )
    })
}

function eliminarEmpleado( empleado ) {
    return new Promise((resolve, reject) => {
        datos.eliminar( empleado )
        resolve( empleado )
    })
}

module.exports = {
    obtenerEmpleados,
    agregarEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
}