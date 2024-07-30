const express = require('express');
const router = express.Router();
const moneyEntryController = require('../controllers/moneyEntryController');

// Rutas existentes
router.get('/', moneyEntryController.index);
router.post('/', moneyEntryController.store);
router.get('/:ID', moneyEntryController.show);
router.put('/:ID', moneyEntryController.update);
router.delete('/:ID', moneyEntryController.delete);
router.get('/filterByDate', moneyEntryController.filterByDate);
router.get('/filterBySaleId', moneyEntryController.filterBySaleId);

module.exports = router;
