const express = require('express');
const {informasi, ciri, solusi} = require('../controllers/infoController.js');
const router = express.Router();

router.get('/informasi', informasi);
router.get('/ciri-ciri', ciri);
router.get('/solusi', solusi);

module.exports = router;