const connection = require('../../db');



exports.all = async () => {
    const query = `
        SELECT role_id, role_name, role_description, created_at, modified_at
        FROM roles
    `;
    try {
        [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
}




exports.find = async (ID) => {
    const query = `
        SELECT role_id, role_name, role_description, created_at, modified_at
        FROM roles
        WHERE role_id = ?
    `;
    try {
        [results] = await connection.query(query, [ID]);
        return (results.length == 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
}
