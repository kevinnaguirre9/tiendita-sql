const datos = require('./almacenamiento')

function iniciarSesion( empleado ) {
    return new Promise((resolve, reject) => {
        const res = datos.iniciarSesion( empleado )
        resolve( res )
    })
}


module.exports = {
    iniciarSesion
}