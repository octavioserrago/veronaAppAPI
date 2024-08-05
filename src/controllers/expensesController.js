const expensesModel = require('../models/expensesModel');

exports.index = async (req, res) => {
    try {
        const results = await expensesModel.all();
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los gastos' });
    }
}

exports.store = async (req, res) => {
    const { description, amount, date } = req.body;
    try {
        await expensesModel.create({ description, amount, date });
        res.json({ success: true, message: 'El gasto se ha creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar agregar el gasto' });
    }
}

exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await expensesModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'El gasto no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar el gasto' });
    }
}

exports.update = async (req, res) => {
    const { ID } = req.params;
    const { description, amount, date } = req.body;
    try {
        await expensesModel.update({ expense_id: ID, description, amount, date });
        res.json({ success: true, message: 'El gasto se ha modificado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar modificar el gasto' });
    }
}
exports.findByBranchId = async (req, res) => {
    const { branchId } = req.params;
    try {
        const results = await expensesModel.findByBranchId(branchId);
        if (results.length === 0) {
            res.status(404).json({ success: false, message: 'No se encontraron gastos para esta sucursal' });
        } else {
            res.json({ success: true, results });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar los gastos' });
    }
};

exports.delete = async (req, res) => {
    const { ID } = req.params;
    try {
        await expensesModel.delete(ID);
        res.json({ success: true, message: 'El gasto se ha eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar eliminar el gasto' });
    }
}
