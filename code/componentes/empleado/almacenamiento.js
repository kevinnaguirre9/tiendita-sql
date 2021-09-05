const pool = require('../../bd')
const bcrypt = require('bcryptjs')

async function obtenerEmpleado( filtroEmpleado ) {
    let resultado = null

    if (filtroEmpleado) {
        resultado = await pool.query('SELECT * FROM empleado WHERE cedula LIKE $1;', ['%' + filtroEmpleado + '%'])
    } else {
        resultado = await pool.query('SELECT * FROM empleado')
    }
    return resultado.rows
}

const encriptarClave = async(clave) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(clave, salt);
    } catch (error) {
        throw error
    }
}

async function agregarEmpleado( empleado ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')

        const clave = await encriptarClave(empleado.clave)

        const empleado_creado = await cliente.query('INSERT INTO empleado (cedula, nombre, apellido, usuario, clave) VALUES ($1, $2, $3, $4, $5)', [empleado.cedula, empleado.nombre, empleado.apellido, empleado.usuario, clave])

        await cliente.query('COMMIT')

        return empleado_creado
    } catch (error) {
        await cliente.query('ROLLBACK')
        throw error
    } finally {
        cliente.release()
    }
}

async function actualizarEmpleado( empleado ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')

        const clave = await encriptarClave(empleado.clave)

        const empleado_actualizar = 'UPDATE empleado SET nombre = $1, apellido = $2, usuario = $3, clave = $4 WHERE cedula = $5'
        const res1 = await cliente.query(empleado_actualizar, [empleado.nombre, empleado.apellido, empleado.usuario, clave, empleado.cedula])

        await cliente.query('COMMIT')

        return res1
    } catch (error) {
        await cliente.query('ROLLBACK')
        throw error
    } finally {
        cliente.release()
    }
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