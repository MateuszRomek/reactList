const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists');
const isAuth = require('../middleware/isAuth');
router.get('/lists', isAuth, listsController.getAllLists);
router.post('/lists/create', isAuth, listsController.createList);

module.exports = router;
