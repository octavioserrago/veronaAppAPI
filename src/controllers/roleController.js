const roleModel = require('../models/roleModel');


exports.index = async (req, res) => {
    try {
        const results = await roleModel.all();
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar rol' });
    }
}


exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await roleModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'El rol no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar rol' });
    }
}