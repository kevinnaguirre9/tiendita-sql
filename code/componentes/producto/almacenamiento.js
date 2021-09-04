const pool = require('../../bd')

async function obtenerProducto( filtroProducto ) {
    let resultado = null

    if (filtroProducto) {
        resultado = await pool.query('SELECT * FROM producto WHERE nombre LIKE $1;', 
        ['%' + filtroProducto + '%'])
    } else {
        resultado = await pool.query('SELECT * FROM producto')
    }
    return resultado.rows
}

async function agregarProducto( producto ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')

        const producto_insertar = 'INSERT INTO producto (nombre, valor) VALUES ($1, $2) RETURNING id_producto'
        const res1 = await cliente.query(producto_insertar, [producto.nombre, producto.valor])

        const id_producto = res1.rows[0].id_producto // id del producto insertado 

        for (let {proveedor} of producto.proveedores) {
            await cliente.query('INSERT INTO proveedor_producto (ref_proveedor, ref_producto) VALUES ($1, $2)', [proveedor, id_producto])
        };

        await cliente.query('COMMIT')
    } catch(error){
        await cliente.query('ROLLBACK')
        throw error
    } finally{
        cliente.release()
    }
}

async function actualizarProducto( producto ) {
    return await pool.query('UPDATE producto SET nombre = $1, valor = $2 WHERE id_producto = $3', [producto.nombre, producto.valor, producto.id_producto])

}

async function eliminarProducto( producto ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')

        const proveedor_producto_eliminar = 'DELETE FROM proveedor_producto WHERE ref_producto = $1'
        const res1 = await cliente.query(proveedor_producto_eliminar, [producto.id_producto])

        const producto_eliminar = 'DELETE FROM producto WHERE id_producto = $1'
        const res2 = await cliente.query(producto_eliminar, [producto.id_producto])

        await cliente.query('COMMIT')
    } catch(error) {
        await cliente.query('ROLLBACK')
        throw error
    } finally {
        cliente.release()
    }
}

module.exports = {
    obtener: obtenerProducto,
    agregar: agregarProducto,
    actualizar: actualizarProducto,
    eliminar: eliminarProducto
}