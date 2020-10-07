const express = require('express');
const router = express.Router();
const listsController = require('../controllers/lists');
const isAuth = require('../middleware/isAuth');
router.get('/lists', isAuth, listsController.getAllLists);
router.post('/lists', isAuth, listsController.createList);
router.put('/lists', isAuth, listsController.updateList);

module.exports = router;
