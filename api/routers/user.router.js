const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.index);
router.post('/', userController.store);
router.post('/login', userController.login);

module.exports = router;