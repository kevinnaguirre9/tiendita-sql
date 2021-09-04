const pool = require('../bd')

const verificarUsuarioDuplicado = async (req, res, next) => {
     try {
          const usuario = req.body.usuario;

          const empleado = await pool.query('SELECT * FROM empleado WHERE usuario = $1;', [usuario])
          
          if (empleado.rowCount > 0) return res.status(400).json({ mensaje: "El usuario ya existe" });

          next();
     } catch (error) {
          res.status(500).json({ message: error });
     }
}

module.exports = {
     verificarUsuarioDuplicado
}