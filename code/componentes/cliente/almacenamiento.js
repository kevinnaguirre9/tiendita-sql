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
    return await pool.query('INSERT INTO cliente (cedula, nombre, apellido, ref_ciudad) VALUES ($1, $2, $3, $4)', [cliente.cedula, cliente.nombre, cliente.apellido, cliente.usuario, cliente.clave])
}

async function actualizarCliente( empleado ) {
    return await pool.query('UPDATE empleado SET nombre = $1, apellido = $2, usuario = $3, clave = $4 WHERE cedula = $5', [empleado.nombre, empleado.apellido, empleado.usuario, empleado.clave, empleado.cedula])
}

async function eliminarCliente( empleado ) {
    return await pool.query('DELETE FROM empleado WHERE cedula = $1', [empleado.cedula])
}

module.exports = {
    obtener: obtenerCliente,
    agregar: agregarCliente,
    actualizar: actualizarCliente,
    eliminar: eliminarCliente,
}