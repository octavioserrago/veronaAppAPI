const connection = require('../../db');

// Recupera todas las verificaciones de crédito
exports.all = async () => {
    const query = `
        SELECT * FROM creditVerifications
    `;
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};

exports.findByBranchId = async (branchId) => {
    const query = `
        SELECT
            cv.creditVerification_id,
            cv.sale_id,
            cv.amount_charged,
            cv.real_amount,
            cv.created_at,
            cv.modified_at
        FROM
            creditVerifications cv
        JOIN
            sales s ON cv.sale_id = s.sale_id
        WHERE
            s.branch_id = ?
    `;
    try {
        const [results] = await connection.query(query, [branchId]);
        return results;
    } catch (error) {
        throw error;
    }
};


// Actualiza el real_amount de una verificación de crédito existente
exports.updateRealAmount = async (creditVerification_id, real_amount) => {
    const query = `
        UPDATE creditVerifications
        SET real_amount = ?
        WHERE creditVerification_id = ?
    `;
    try {
        await connection.query(query, [real_amount, creditVerification_id]);
    } catch (error) {
        throw error;
    }
};


// Crea una nueva verificación de crédito
exports.create = async ({ sale_id, amount_charged, real_amount }) => {
    const query = `
        INSERT INTO creditVerifications (sale_id, amount_charged, real_amount)
        VALUES (?, ?, ?)
    `;
    try {
        await connection.query(query, [sale_id, amount_charged, real_amount]);
    } catch (error) {
        throw error;
    }
};

// Encuentra una verificación de crédito por ID
exports.find = async (id) => {
    const query = `
        SELECT * FROM creditVerifications
        WHERE creditVerification_id = ?
    `;
    try {
        const [results] = await connection.query(query, [id]);
        return (results.length === 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

// Actualiza una verificación de crédito existente
exports.update = async ({ creditVerification_id, sale_id, amount_charged, real_amount }) => {
    const query = `
        UPDATE creditVerifications
        SET
            sale_id = ?,
            amount_charged = ?,
            real_amount = ?
        WHERE creditVerification_id = ?
    `;
    try {
        await connection.query(query, [sale_id, amount_charged, real_amount, creditVerification_id]);
    } catch (error) {
        throw error;
    }
};

// Elimina una verificación de crédito por ID
exports.delete = async (id) => {
    const query = `
        DELETE FROM creditVerifications
        WHERE creditVerification_id = ?
    `;
    try {
        await connection.query(query, [id]);
    } catch (error) {
        throw error;
    }
};
