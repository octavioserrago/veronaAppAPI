const moneyEntryModel = require('../models/moneyEntryModel');

exports.index = async (req, res) => {
    try {
        const results = await moneyEntryModel.all();
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar las entradas de dinero' });
    }
}

exports.store = async (req, res) => {
    const { branch_id, date, amount, user_id, sale_id } = req.body;
    try {
        await moneyEntryModel.create({ branch_id, date, amount, user_id, sale_id });
        res.json({ success: true, message: 'La entrada de dinero se ha creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar agregar la entrada de dinero' });
    }
}

exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await moneyEntryModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'La entrada de dinero no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar la entrada de dinero' });
    }
}

exports.update = async (req, res) => {
    const { ID } = req.params;
    const { branch_id, date, amount, user_id, sale_id } = req.body;
    try {
        await moneyEntryModel.update({ moneyEntry_id: ID, branch_id, date, amount, user_id, sale_id });
        res.json({ success: true, message: 'La entrada de dinero se ha modificado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar modificar la entrada de dinero' });
    }
}

exports.delete = async (req, res) => {
    const { ID } = req.params;
    try {
        await moneyEntryModel.delete(ID);
        res.json({ success: true, message: 'La entrada de dinero se ha eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar eliminar la entrada de dinero' });
    }
}

exports.filterByDate = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const results = await moneyEntryModel.filterByDate(startDate, endDate);
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar filtrar las entradas de dinero por fecha' });
    }
}

exports.filterBySaleId = async (req, res) => {
    const { sale_id } = req.query; // Obtén el sale_id de los parámetros de consulta

    if (!sale_id) {
        return res.status(400).json({ error: 'El parámetro sale_id es requerido.' });
    }

    try {
        // Consulta a la base de datos para obtener las entradas de dinero por sale_id
        const entries = await MoneyEntry.findAll({
            where: { sale_id }
        });

        // Responde con los datos obtenidos
        res.status(200).json({ results: entries });
    } catch (error) {
        console.error('Error al obtener entradas de dinero:', error);
        res.status(500).json({ error: 'Error al obtener entradas de dinero.' });
    }
};
