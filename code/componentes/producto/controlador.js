const datos = require('./almacenamiento')

function obtenerProductos( filtroProveedor ) {
    return new Promise((resolve, reject) => {
        resolve( datos.obtener( filtroProveedor ) )
    })
}

function agregarProducto( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.agregar( proveedor )
        resolve( proveedor )
    })
}

function actualizarProducto( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.actualizar( proveedor )
        resolve( proveedor )
    })
}

function eliminarProducto( proveedor ) {
    return new Promise((resolve, reject) => {
        datos.eliminar( proveedor )
        resolve( proveedor )
    })
}

module.exports = {
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
}