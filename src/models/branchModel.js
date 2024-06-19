const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper')


exports.all = async () => {
    const query = `
        SELECT branch_id, branch_name, branch_city, branch_address, created_at
        FROM branches
    `;
    try {
        [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}


exports.create = async ({ nombre, descripcion, cupo }) => {
    const query = `
        INSERT INTO branches (branch_name, branch_city, branch_address)
        VALUES(?, ?, ?)
    `;
    try {
        await connection.query(query, [nombre, descripcion, cupo, formatToday(), formatToday()]);
    } catch (error) {
        throw error;
    }
}


exports.find = async (ID) => {
    const query = `
        SELECT branch_id, branch_name, branch_city, branch_address, created_at
        FROM branches
        WHERE branch_id = ?
    `;
    try {
        [results] = await connection.query(query, [ID]);
        return (results.length == 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
}


exports.update = async ({ ID, nombre, descripcion, cupo }) => {
    const query = `
        UPDATE branches
        SET
            branch_name = ?,
            branch_city = ?,
            branch_address = ?,
            modified_at = ?
        WHERE id = ?
    `;
    try {
        await connection.query(query, [nombre, descripcion, cupo, formatToday(), ID]);
    } catch (error) {
        throw error;
    }
}
