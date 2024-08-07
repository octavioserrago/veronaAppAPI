const saleModel = require('../models/saleModel');


exports.index = async (req, res) => {
    try {
        const searchTerm = req.query.search || '';

        const results = await saleModel.search(searchTerm);
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar las ventas' });
    }
};


exports.store = async (req, res) => {
    const { customer, material, color, detail, payment_method, total_amount, branch_id } = req.body;
    try {
        await saleModel.create({ customer, material, color, detail, payment_method, total_amount, branch_id });
        res.json({ success: true, message: 'La venta se ha creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar crear la venta' });
    }
}


exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await saleModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'La venta no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar la venta' });
    }
}


exports.update = async (req, res) => {
    const { ID } = req.params;
    const { customer, material, detail, payment_method, discount, total_amount } = req.body;
    try {
        saleModel.update({ customer, material, detail, payment_method, discount, total_amount, ID });
        res.json({ success: true, message: 'La venta se ha modificado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar la venta' });
    }
}
