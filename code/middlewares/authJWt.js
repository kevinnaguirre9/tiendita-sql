const config = require('../configuracion')
const pool = require('../bd')

const verifyToken = async(req, res, next) => {
     let token = req.headers["x-access-token"];
     if (!token) return res.status(403).json({ message: "Token no proporcionado" });

     try {
          const decodificado = jwt.verify(token, config.JWT_SECRET);
          req.empleadoId = decodificado.id

          const empleado = await pool.query('SELECT * FROM empleado WHERE cedula = $1;', [req.empleadoId])

          if (empleado.rowCount === 0) return res.status(404).json({ message: "Empleado no encontrado" });

          next();
     } catch (error) {
          console.log(error)
          return res.status(401).json({ message: "No autorizado!" });
     }
}

module.exports = {
     verifyToken
}