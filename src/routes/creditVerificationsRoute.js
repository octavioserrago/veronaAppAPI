const express = require('express');
const router = express.Router();
const creditVerificationsController = require('../controllers/creditVerificationsController');


router.get('/', creditVerificationsController.index);
router.post('/', creditVerificationsController.store);
router.get('/:ID', creditVerificationsController.show);
router.put('/:ID', creditVerificationsController.update);
router.delete('/:ID', creditVerificationsController.delete);
router.get('/findByBranchId/:branch_id', creditVerificationsController.findByBranchId);
router.put('/updateRealAmount', creditVerificationsController.updateRealAmount);

module.exports = router;


