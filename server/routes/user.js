const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const userController = require('../controllers/user.js');

router.get('/userInf', isAuth, userController.getUserinfo);

module.exports = router;
