const datos = require('./almacenamiento')

function obtenerProveedor( filtroProveedor ) {
    return new Promise((resolve, reject) => {
        resolve( datos.obtener( filtroProveedor ) )
    })
}

function agregarProveedor( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.agregar( proveedor )
        resolve( proveedor )
    })
}

function actualizarProveedor( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.actualizar( proveedor )
        resolve( proveedor )
    })
}

function eliminarProveedor( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.eliminar( proveedor )
        resolve( proveedor )
    })
}

module.exports = {
    obtenerProveedor,
    agregarProveedor,
    actualizarProveedor,
    eliminarProveedor,
}