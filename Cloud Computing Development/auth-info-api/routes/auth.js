const express = require('express');
const {register, login, deleteUser} = require('../controllers/authController.js');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.delete('/delete/:name', deleteUser );

module.exports = router;