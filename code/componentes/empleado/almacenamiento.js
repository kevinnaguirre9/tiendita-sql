const pool = require('../../bd')

async function obtenerEmpleado( filtroEmpleado ) {
    let resultado = null

    if (filtroEmpleado) {
        resultado = await pool.query('SELECT * FROM empleado WHERE cedula LIKE $1;', ['%' + filtroEmpleado + '%'])
    } else {
        resultado = await pool.query('SELECT * FROM empleado')
    }
    return resultado.rows
}

async function agregarEmpleado( empleado ) {
    return await pool.query('INSERT INTO empleado (cedula, nombre, apellido, usuario, clave) VALUES ($1, $2, $3, $4, $5)', [empleado.cedula, empleado.nombre, empleado.apellido, empleado.usuario, empleado.clave])
}

async function actualizarEmpleado( empleado ) {
    return await pool.query('UPDATE empleado SET nombre = $1, apellido = $2, usuario = $3, clave = $4 WHERE cedula = $5', [empleado.nombre, empleado.apellido, empleado.usuario, empleado.clave, empleado.cedula])
}

async function eliminarEmpleado( empleado ) {
    return await pool.query('DELETE FROM empleado WHERE cedula = $1', [empleado.cedula])
}

module.exports = {
    obtener: obtenerEmpleado,
    agregar: agregarEmpleado,
    actualizar: actualizarEmpleado,
    eliminar: eliminarEmpleado,
}