const creditVerificationModel = require('../models/creditVerificationsModel');

exports.index = async (req, res) => {
    try {
        const results = await creditVerificationModel.all();
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar las verificaciones de crédito' });
    }
}

exports.findByBranchId = async (req, res) => {
    try {
        const branchId = req.params.branch_id;

        if (!branchId) {
            return res.status(400).json({ success: false, message: 'branch_id es requerido' });
        }

        const results = await creditVerificationModel.findByBranchId(branchId);
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar las verificaciones de crédito' });
    }
};


// Actualiza el real_amount de una verificación de crédito
exports.updateRealAmount = async (req, res) => {
    const { creditVerification_id, real_amount } = req.body;

    if (!creditVerification_id || real_amount === undefined) {
        return res.status(400).json({ success: false, message: 'Faltan parámetros' });
    }

    try {
        await creditVerificationModel.updateRealAmount(creditVerification_id, real_amount);
        res.json({ success: true, message: 'Monto real actualizado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar actualizar el monto real' });
    }
};

exports.store = async (req, res) => {
    const { sale_id, amount_charged, real_amount } = req.body;
    try {
        await creditVerificationModel.create({ sale_id, amount_charged, real_amount });
        res.json({ success: true, message: 'La verificación de crédito se ha creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar agregar la verificación de crédito' });
    }
}

exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await creditVerificationModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'La verificación de crédito no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar la verificación de crédito' });
    }
}

exports.update = async (req, res) => {
    const { ID } = req.params;
    const { sale_id, amount_charged, real_amount } = req.body;
    try {
        await creditVerificationModel.update({ creditVerification_id: ID, sale_id, amount_charged, real_amount });
        res.json({ success: true, message: 'La verificación de crédito se ha modificado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar modificar la verificación de crédito' });
    }
}

exports.delete = async (req, res) => {
    const { ID } = req.params;
    try {
        await creditVerificationModel.delete(ID);
        res.json({ success: true, message: 'La verificación de crédito se ha eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar eliminar la verificación de crédito' });
    }
}
