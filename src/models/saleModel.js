const connection = require('../../db');

// Obtener todas las ventas
exports.all = async () => {
    const query = `SELECT * FROM sales`;
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw new Error(`Error al recuperar las ventas: ${error.message}`);
    }
}

exports.create = async ({ customer, material, color, detail, payment_method, total_amount, branch_id }) => {
    try {
        console.log('Datos recibidos en create:', { customer, material, color, detail, payment_method, total_amount, branch_id });

        if (!customer || !material || !color || !detail || !payment_method || !total_amount || !branch_id) {
            throw new Error('Todos los campos son requeridos.');
        }

        const query = `INSERT INTO sales (customer, material, color, detail, payment_method, total_amount, branch_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        await connection.query(query, [customer, material, color, detail, payment_method, total_amount, branch_id]);
    } catch (error) {
        throw new Error(`Error al crear la venta: ${error.message}`);
    }
};


exports.find = async (ID) => {
    const query = `
        SELECT sale_id, customer, material, color, detail, payment_method, total_amount, branch_id, created_at, modified_at
        FROM sales WHERE sale_id = ?`;
    try {
        const [results] = await connection.query(query, [ID]);
        return (results.length === 1) ? results[0] : null;
    } catch (error) {
        throw new Error(`Error al recuperar la venta: ${error.message}`);
    }
}

// Actualizar una venta
exports.update = async ({ sale_id, customer, material, color, detail, payment_method, discount, total_amount }) => {
    const query = `
        UPDATE sales
        SET customer = ?, material = ?, color = ?, detail = ?, payment_method = ?, discount = ?, total_amount = ?
        WHERE sale_id = ?`;
    try {
        await connection.query(query, [customer, material, color, detail, payment_method, discount, total_amount, sale_id]);
    } catch (error) {
        throw new Error(`Error al actualizar la venta: ${error.message}`);
    }
}

// Eliminar una venta
exports.delete = async (ID) => {
    const query = `DELETE FROM sales WHERE sale_id = ?`;
    try {
        const [result] = await connection.query(query, [ID]);
        return result.affectedRows;
    } catch (error) {
        throw new Error(`Error al eliminar la venta: ${error.message}`);
    }
}

exports.search = async (searchTerm) => {
    try {
        let query;
        let params;

        if (searchTerm) {
            query = `
                SELECT sale_id, customer, material, color, detail, payment_method, total_amount, branch_id, created_at, modified_at
                FROM sales
                WHERE sale_id = ? OR customer LIKE ?`;
            params = [searchTerm, `%${searchTerm}%`];
        } else {
            query = `SELECT * FROM sales`;
            params = [];
        }

        const [results] = await connection.query(query, params);
        return results;
    } catch (error) {
        throw new Error(`Error al buscar las ventas: ${error.message}`);
    }
};
