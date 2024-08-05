const connection = require('../../db');

exports.all = async () => {
    const query = `
        SELECT * FROM expenses
    `;
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};

// Encuentra gastos por branch_Id
exports.findByBranchId = async (branchId) => {
    const query = `
        SELECT
            e.expense_id,
            e.detail,
            e.payment_method,
            e.amount,
            e.branch_Id,
            e.created_at
        FROM
            expenses e
        WHERE
            e.branch_Id = ?
    `;
    try {
        const [results] = await connection.query(query, [branchId]);
        return results;
    } catch (error) {
        throw error;
    }
};

// Crea un nuevo gasto
exports.create = async ({ detail, payment_method, amount, branch_Id }) => {
    const query = `
        INSERT INTO expenses (detail, payment_method, amount, branch_Id)
        VALUES (?, ?, ?, ?)
    `;
    try {
        await connection.query(query, [detail, payment_method, amount, branch_Id]);
    } catch (error) {
        throw error;
    }
};

// Encuentra un gasto por ID
exports.find = async (id) => {
    const query = `
        SELECT * FROM expenses
        WHERE expense_id = ?
    `;
    try {
        const [results] = await connection.query(query, [id]);
        return (results.length === 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

// Actualiza un gasto existente
exports.update = async ({ expense_id, detail, payment_method, amount, branch_Id }) => {
    const query = `
        UPDATE expenses
        SET
            detail = ?,
            payment_method = ?,
            amount = ?,
            branch_Id = ?
        WHERE expense_id = ?
    `;
    try {
        await connection.query(query, [detail, payment_method, amount, branch_Id, expense_id]);
    } catch (error) {
        throw error;
    }
};

// Elimina un gasto por ID
exports.delete = async (id) => {
    const query = `
        DELETE FROM expenses
        WHERE expense_id = ?
    `;
    try {
        await connection.query(query, [id]);
    } catch (error) {
        throw error;
    }
};
