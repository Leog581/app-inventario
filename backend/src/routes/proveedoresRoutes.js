const express = require('express');
const router = express.Router();
const { searchProveedores } = require('../controllers/proveedoresController');

router.get('/', searchProveedores);

module.exports = router;