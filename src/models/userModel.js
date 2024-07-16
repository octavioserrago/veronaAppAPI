const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper');
const bcrypt = require('bcrypt');
const saltRounds = 10;



exports.all = async () => {
    const query = `
        SELECT user_id, user_name, user_password, role_id, branch_id FROM users`;
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};



exports.create = async ({ name, password, role_id, branch_id }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const query = `
        INSERT INTO users (user_name, user_password, role_id, branch_id) VALUES (?, ?, ?, ?)`;
    try {
        await connection.query(query, [name, hashedPassword, role_id, branch_id]);
    } catch (error) {
        throw error;
    }
};

exports.find = async (ID) => {
    const query = `
        SELECT user_id, user_name, user_password, role_id, branch_id, created_at, modified_at FROM users WHERE user_id = ?`;
    try {
        const [results] = await connection.query(query, [ID]);
        return (results.length == 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
};


exports.update = async ({ ID, name, password }) => {
    const query = `
        UPDATE users
        SET
            user_name = ?,
            user_password = ?,
            modified_at = ?
        WHERE user_id = ?`;
    try {
        const modifiedAt = formatToday();
        await connection.query(query, [name, password, modifiedAt, ID]);
        return { success: true, message: 'Usuario actualizado correctamente' };
    } catch (error) {
        throw error;
    }
};


exports.auth = async ({ name, password }) => {
    const query = `
        SELECT user_name, user_password, role_id, branch_id 
        FROM users 
        WHERE user_name = ?`;
    try {
        const [rows] = await connection.query(query, [name]);
        if (rows.length > 0) {
            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.user_password);
            if (isPasswordValid) {
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};








