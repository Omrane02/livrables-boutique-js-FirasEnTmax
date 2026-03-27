const express = require('express');
const router = express.Router();
const { getAddresses, addAddress, setDefaultAddress, deleteAddress } = require('../controller/addresses');
const { verifyToken } = require('../middleware/auth');

router.use(verifyToken);

router.get('/', getAddresses);
router.post('/', addAddress);
router.put('/:id/default', setDefaultAddress);
router.delete('/:id', deleteAddress);

module.exports = router;