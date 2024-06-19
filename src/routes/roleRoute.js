const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');


router.get('/', roleController.index);
router.get('/:ID', roleController.show);



module.exports = router;