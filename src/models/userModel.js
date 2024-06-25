const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper')


exports.all = async () => {
    const query = `
        SELECT user_id, user_name, user_password, role_id, branch_id FROM users`;
    try {
        [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}


exports.create = async ({ name, password, role_id, branch_id }) => {
    const query = `
        INSERT INTO users (user_name, user_password, role_id, branch_id )
        VALUES(?, ?, ?, ?)
    `;
    try {
        await connection.query(query, [name, password, role_id, branch_id]);
    } catch (error) {
        throw error;
    }
}


exports.find = async (ID) => {
    const query = `
        SELECT user_id, user_name, user_password, role_id, branch_id, created_at, modified_at FROM users WHERE user_id = ?`;
    try {
        [results] = await connection.query(query, [ID]);
        return (results.length == 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
}


exports.update = async ({ ID, name, password }) => {
    const query = `
        UPDATE users
        SET
            user_name = ?,
            user_password = ?,
            modified_at = ?
        WHERE users_id = ?
    `;
    try {
        await connection.query(query, [name, password, ID]);
    } catch (error) {
        throw error;
    }
}
