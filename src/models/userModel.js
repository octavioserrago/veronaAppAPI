const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper');
const bcrypt = require('bcrypt');

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
    const saltRounds = 10;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const query = `
            INSERT INTO users (user_name, user_password, role_id, branch_id) VALUES (?, ?, ?, ?)`;
        await connection.query(query, [name, hashedPassword, role_id, branch_id]);
        return { success: true, message: 'Usuario creado exitosamente' };
    } catch (error) {
        throw error;
    }
};
exports.find = async (ID) => {
    const query = `
        SELECT user_id, user_name, user_password, role_id, branch_id, created_at, modified_at FROM users WHERE user_id = ?`;
    try {
        const [results] = await connection.query(query, [ID]);
        return results.length === 1 ? results[0] : null;
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
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await connection.query(query, [name, hashedPassword, modifiedAt, ID]);
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

exports.delete = (ID) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE user_id = ?';
        connection.query(query, [ID], (error, results) => {
            if (error) {
                console.error('Error en la consulta a la base de datos:', error); // Agregar registro del error para diagnóstico
                return reject(error);
            }
            resolve(results);
        });
    });
};