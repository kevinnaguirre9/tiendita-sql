const pool = require('../../bd')

async function obtenerFacturas( filtroFacturas ) {
    let resultado = null
    
    if (filtroFacturas) {
        resultado = await pool.query('SELECT * FROM factura WHERE id_factura = $1;', [filtroFacturas])
    } else {
        resultado = await pool.query('SELECT * FROM factura')
    }
    return resultado.rows
}

async function agregarFactura( factura ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')
        const factura_registrar = 'INSERT INTO factura(fecha_emision, valor_total, ref_empleado, ref_cliente) VALUES($1, $2, $3, $4) RETURNING id_factura'

        const res1 = await cliente.query(factura_registrar, [new Date(), factura.valor_total, factura.empleado, factura.cliente])

        const id_factura = res1.rows[0].id_factura
        
        for (let {cantidad, cantidad_x_valor, producto} of factura.detalles) {
            const detalle_insertar = 'INSERT INTO factura_detalle(cantidad, cantidad_x_valor, ref_factura, ref_producto) VALUES ($1, $2, $3, $4)'
            const res2 = await cliente.query(detalle_insertar, [cantidad, cantidad_x_valor, id_factura, producto])                
        }

        await cliente.query('COMMIT')
    } catch(error) {
        await cliente.query('ROLLBACK')
        throw error
    } finally {
        cliente.release()
    }
}

async function actualizarFactura( factura ) {
    /*return await pool.query('UPDATE ciudad SET nombre = $1, ref_pais = $2 WHERE id_ciudad = $3', [ciudad.nombre, ciudad.pais, ciudad.id_ciudad])*/
}

async function eliminarFactura( factura ) {
    const cliente = await pool.connect() 

    try {
        await cliente.query('BEGIN')

        const factura_detalle_eliminar = 'DELETE FROM factura_detalle WHERE ref_factura = $1'
        const res1 = await cliente.query(factura_detalle_eliminar, [factura.codigo])
        
        const factura_eliminar = 'DELETE FROM factura WHERE id_factura = $1'
        const res2 = await cliente.query(factura_eliminar, [factura.codigo])

        await cliente.query('COMMIT')
    } catch(error) {
        await cliente.query('ROLLBACK')
        throw error
    } finally {
        cliente.release()
    }
}

module.exports = {
    obtener: obtenerFacturas,
    agregar: agregarFactura,
    actualizar: actualizarFactura,
    eliminar: eliminarFactura,
}