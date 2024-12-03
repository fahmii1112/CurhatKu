const express = require('express');
const {register, login, deleteUser} = require('../controllers/authController.js');
const router = express.Router();
exports.router = router;

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:displayName', deleteUser );

module.exports = router;