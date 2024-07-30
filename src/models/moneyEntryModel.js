const connection = require('../../db');
const { formatToday } = require('../helpers/dateHelper');

exports.all = async () => {
    const query = `
        SELECT * FROM moneyEntries
    `;
    try {
        const [results] = await connection.query(query);
        return results;
    } catch (error) {
        throw error;
    }
};

exports.create = async ({ branch_id, date, amount, user_id, sale_id }) => {
    const query = `
        INSERT INTO moneyEntries (branch_id, date, amount, user_id, sale_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    try {
        await connection.query(query, [branch_id, date, amount, user_id, sale_id]);
    } catch (error) {
        throw error;
    }
};

exports.find = async (id) => {
    const query = `
        SELECT * FROM moneyEntries
        WHERE moneyEntry_id = ?
    `;
    try {
        const [results] = await connection.query(query, [id]);
        return (results.length === 1) ? results[0] : null;
    } catch (error) {
        throw error;
    }
};

exports.update = async ({ moneyEntry_id, branch_id, date, amount, user_id, sale_id }) => {
    const query = `
        UPDATE moneyEntries
        SET
            branch_id = ?,
            date = ?,
            amount = ?,
            user_id = ?,
            sale_id = ?
        WHERE moneyEntry_id = ?
    `;
    try {
        await connection.query(query, [branch_id, date, amount, user_id, sale_id, moneyEntry_id]);
    } catch (error) {
        throw error;
    }
};

exports.delete = async (id) => {
    const query = `
        DELETE FROM moneyEntries
        WHERE moneyEntry_id = ?
    `;
    try {
        await connection.query(query, [id]);
    } catch (error) {
        throw error;
    }
};

exports.filterByDate = async (startDate, endDate) => {
    const query = `
        SELECT * FROM moneyEntries
        WHERE date BETWEEN ? AND ?
    `;
    try {
        const [results] = await connection.query(query, [startDate, endDate]);
        return results;
    } catch (error) {
        throw error;
    }
};

exports.filterBySaleId = async (sale_id) => {
    const query = `
        SELECT * FROM moneyEntries
        WHERE sale_id = ?
    `;
    try {
        const [results] = await connection.query(query, [sale_id]);
        return results;
    } catch (error) {
        throw error;
    }
};
