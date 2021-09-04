const pool = require('../../bd')

async function obtenerProveedor( filtroProveedor ) {
    let resultado = null

    if (filtroProveedor) {
        resultado = await pool.query('SELECT * FROM proveedor WHERE nombre LIKE $1;', ['%' + filtroProveedor + '%'])
    } else {
        resultado = await pool.query('SELECT * FROM proveedor')
    }
    return resultado.rows
}

async function agregarProveedor( proveedor ) {
    return await pool.query('INSERT INTO proveedor (nombre, domicilio) VALUES ($1, $2)', [proveedor.nombre, proveedor.domicilio])
}

async function actualizarProveedor( proveedor ) {
    return await pool.query('UPDATE proveedor SET nombre = $1, domicilio = $2 WHERE id_proveedor = $3', [proveedor.nombre, proveedor.domicilio, proveedor.id_proveedor])
}

async function eliminarProveedor( proveedor ) {
    return await pool.query('DELETE FROM proveedor WHERE id_proveedor = $1', [proveedor.id_proveedor])
}

module.exports = {
    obtener: obtenerProveedor,
    agregar: agregarProveedor,
    actualizar: actualizarProveedor,
    eliminar: eliminarProveedor,
}