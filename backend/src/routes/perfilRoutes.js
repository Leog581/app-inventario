const express = require('express');
const router = express.Router();
const { getPerfil } = require('../controllers/perfilController');

router.get('/', getPerfil);

module.exports = router;