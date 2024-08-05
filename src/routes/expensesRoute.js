const express = require('express');
const router = express.Router();
const expensesController = require('../controllers/expensesController');

// Ruta para obtener todos los gastos
router.get('/', expensesController.index);

// Ruta para crear un nuevo gasto
router.post('/', expensesController.store);

// Ruta para obtener un gasto por ID
router.get('/:ID', expensesController.show);

// Ruta para actualizar un gasto por ID
router.put('/:ID', expensesController.update);

// Ruta para eliminar un gasto por ID
router.delete('/:ID', expensesController.delete);

// Ruta para obtener gastos por branchId
router.get('/branch/:branchId', expensesController.findByBranchId);

module.exports = router;
