const connection = require('../../db');

exports.all = async () => {
    const query = `SELECT * from sales`;
    try {
        [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}

exports.create = async ({ customer, material, color, detail, payment_method, discount, total_amount }) => {
    const query = `INSERT INTO sales (customer, material, color, detail, payment_method, discount, total_amount ) VALUES(?, ?, ?, ?, ?, ?, ?)`;
    try {
        const [result] = await connection.query(query, [customer, material, color, detail, payment_method, discount, total_amount]);
    } catch (error) {
        throw error;
    }
}

exports.find = async (ID) => {
    const query = `
        SELECT sale_id, customer, material, color, detail, payment_method, discount, total_amount, created_at, modified_at FROM sales WHERE sale_id = ?`;
    try {
        [results] = await connection.query(query, [ID]);
        return (results.length === 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
}

exports.update = async ({ sale_id, customer, material, color, detail, payment_method, discount, total_amount }) => {
    const query = `
        UPDATE sales SET customer = ?, material = ?, color = ?, detail = ?, payment_method = ?, discount = ?, total_amount = ? WHERE sale_id = ?`;
    try {
        await connection.query(query, [customer, material, color, detail, payment_method, discount, total_amount, sale_id]);
    } catch (error) {
        throw error;
    }
}

exports.delete = async (ID) => {
    const query = `DELETE FROM sales WHERE sale_id = ?`;
    try {
        const [result] = await connection.query(query, [ID]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
