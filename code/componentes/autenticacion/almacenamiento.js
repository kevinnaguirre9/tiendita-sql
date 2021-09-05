const pool = require('../../bd')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../configuracion')

async function iniciarSesion( empleado ) {    
    try {
        const usuario_obtener = await pool.query('SELECT * FROM empleado WHERE usuario = $1;', [empleado.usuario])

        let mensaje;

        if(!usuario_obtener.rowCount > 0) {
            mensaje = {
                mensaje: 'Usuario incorrecto'
            }
            return mensaje
        }

        const clave_correcta = await bcrypt.compare(empleado.clave, usuario_obtener.rows[0].clave);

        if(!clave_correcta) {
            mensaje = {
                mensaje: 'Clave incorrecta'
            }
            return mensaje
        }

        const token = jwt.sign({ id: usuario_obtener.rows[0].cedula }, config.SECRET, {
            expiresIn: 86400, // 24 hours
        });

        return {token}
   } catch (error) {
        throw error
   }
}


module.exports = {
    iniciarSesion
}