const pool = require('../../bd')

async function obtenerCliente( filtroCliente ) {
    let resultado = null

    if (filtroCliente) {
        resultado = await pool.query('SELECT * FROM cliente WHERE cedula LIKE $1;', ['%' + filtroCliente + '%'])
    } else {
        resultado = await pool.query('SELECT * FROM cliente')
    }
    return resultado.rows
}

async function agregarCliente( cliente ) {
    return await pool.query('INSERT INTO cliente (cedula, nombre, apellido, ref_ciudad) VALUES ($1, $2, $3, $4)', [cliente.cedula, cliente.nombre, cliente.apellido, cliente.ciudad])
}

async function actualizarCliente( cliente ) {
    return await pool.query('UPDATE cliente SET nombre = $1, apellido = $2, ref_ciudad = $3 WHERE cedula = $4', [cliente.nombre, cliente.apellido, cliente.ciudad, cliente.cedula])
}

async function eliminarCliente( cliente ) {
    return await pool.query('DELETE FROM cliente WHERE cedula = $1', [cliente.cedula])
}

module.exports = {
    obtener: obtenerCliente,
    agregar: agregarCliente,
    actualizar: actualizarCliente,
    eliminar: eliminarCliente,
}