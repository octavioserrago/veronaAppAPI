const express = require('express');
const router = express.Router();
const saleController = require('../controllers/saleController');


router.get('/', saleController.index);
router.post('/', saleController.store);
router.get('/:ID', saleController.show);
router.put('/:ID', saleController.update);



module.exports = router;