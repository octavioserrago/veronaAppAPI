const userModel = require('../models/userModel');


exports.index = async (req, res) => {
    try {
        const results = await userModel.all();
        res.json({ success: true, results });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar usuarios' });
    }
}


exports.store = async (req, res) => {
    const { name, password, role_id, branch_id } = req.body;
    try {
        await userModel.create({ name, password, role_id, branch_id });
        res.json({ success: true, message: 'El usuario se ha creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar agregar usuario' });
    }
}


exports.show = async (req, res) => {
    const { ID } = req.params;
    try {
        const result = await userModel.find(ID);
        if (result == null) {
            res.status(404).json({ success: false, message: 'El usuario no existe o ha dejado de existir' });
        } else {
            res.json({ success: true, result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar el usuario' });
    }
}


exports.update = async (req, res) => {
    const { ID } = req.params;
    const { name, password } = req.body;
    try {
        userModel.update({ name, password, ID });
        res.json({ success: true, message: 'El usuario se ha modificado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar recuperar el usuaruio' });
    }
}

exports.auth = async (req, res) => {
    const { name, password } = req.body;
    try {
        const user = await userModel.auth({ name, password });
        if (user) {
            res.json({ success: true, message: 'Autenticación exitosa', user });
        } else {
            res.status(401).json({ success: false, message: 'Nombre de usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Error al intentar autenticar el usuario' });
    }
};

